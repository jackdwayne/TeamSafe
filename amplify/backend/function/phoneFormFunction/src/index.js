/* Amplify Params - DO NOT EDIT
	API_AWSTEAMSAFE_GRAPHQLAPIENDPOINTOUTPUT
	API_AWSTEAMSAFE_GRAPHQLAPIIDOUTPUT
	AUTH_AWSTEAMSAFEFCD90582FCD90582_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({profile: 'Jack Amplify'});
AWS.config.credentials = credentials;

// Specify the region.


var pinpoint = new AWS.Pinpoint({region: 'us-east-1'}); 

// Make sure the SMS channel is enabled for the projectId that you specify.
// See: https://docs.aws.amazon.com/pinpoint/latest/userguide/channels-sms-setup.html
var projectId = '46fe3d7696f4400f8a96a3292dc3bbc3';

// You need a dedicated long code in order to use two-way SMS. 
// See: https://docs.aws.amazon.com/pinpoint/latest/userguide/channels-voice-manage.html#channels-voice-manage-request-phone-numbers
var originationNumber = '+18654242261';

// This message is spread across multiple lines for improved readability.
var message = "You can now receive updates and notifications from your manager via AWS Team Safe! Reply 'YES' to confirm or 'STOP' to cancel";
            
var messageType = "TRANSACTIONAL";

exports.handler = (event) => {
  console.log('Received event:', event);
  validateNumber(event);
};

function validateNumber (event) {
  var destinationNumber = event.arguments.destinationNumber;
  if (destinationNumber.length == 10) {
    destinationNumber = "+1" + destinationNumber;
  }
  var params = {
    NumberValidateRequest: {
      IsoCountryCode: 'US',
      PhoneNumber: destinationNumber
    }
  };
  pinpoint.phoneNumberValidate(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    }
    else {
      console.log(data);
      //return data;
      if (data['NumberValidateResponse']['PhoneTypeCode'] == 0) {
        createEndpoint(data, event.arguments.firstName, event.arguments.lastName, event.arguments.source);
      } else {
        console.log("Received a phone number that isn't capable of receiving "
                   +"SMS messages. No endpoint created.");
      }
    }
  });
}

function createEndpoint(data, firstName, lastName, source) {
  var destinationNumber = data['NumberValidateResponse']['CleansedPhoneNumberE164'];
  var endpointId = data['NumberValidateResponse']['CleansedPhoneNumberE164'].substring(1);
  
  var params = {
    ApplicationId: projectId,
    // The Endpoint ID is equal to the cleansed phone number minus the leading
    // plus sign. This makes it easier to easily update the endpoint later.
    EndpointId: endpointId,
    EndpointRequest: {
      ChannelType: 'SMS',
      Address: destinationNumber,
      // OptOut is set to ALL (that is, endpoint is opted out of all messages)
      // because the recipient hasn't confirmed their subscription at this
      // point. When they confirm, a different Lambda function changes this 
      // value to NONE (not opted out).
      OptOut: 'ALL',
      Location: {
        PostalCode:data['NumberValidateResponse']['ZipCode'],
        City:data['NumberValidateResponse']['City'],
        Country:data['NumberValidateResponse']['CountryCodeIso2'],
      },
      Demographic: {
        Timezone:data['NumberValidateResponse']['Timezone']
      },
      Attributes: {
        Source: [
          source
        ]
      },
      User: {
        UserAttributes: {
          FirstName: [
            firstName
          ],
          LastName: [
            lastName
          ]
        }
      }
    }
  };
  pinpoint.updateEndpoint(params, function(err,data) {
    if (err) {
      console.log(err, err.stack);
    }
    else {
      console.log(data);
      //return data;
      sendConfirmation(destinationNumber);
    }
  });
}

function sendConfirmation(destinationNumber) {
  var params = {
    ApplicationId: projectId,
    MessageRequest: {
      Addresses: {
        [destinationNumber]: {
          ChannelType: 'SMS'
        }
      },
      MessageConfiguration: {
        SMSMessage: {
          Body: message,
          MessageType: messageType,
          OriginationNumber: originationNumber
        }
      }
    }
  };

  pinpoint.sendMessages(params, function(err, data) {
    // If something goes wrong, print an error message.
    if(err) {
      console.log(err.message);
    // Otherwise, show the unique ID for the message.
    } else {
      return console.log("Message sent! " 
          + data['MessageResponse']['Result'][destinationNumber]['StatusMessage']);
    }
  });
}