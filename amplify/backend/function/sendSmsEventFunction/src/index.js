
var AWS = require("aws-sdk");
var pinpoint = new AWS.Pinpoint({ region: process.env.region });

// Make sure the SMS channel is enabled for the projectId that you specify.
// See: https://docs.aws.amazon.com/pinpoint/latest/userguide/channels-sms-setup.html
var projectId = process.env.projectId;

// You need a dedicated long code in order to use two-way SMS.
// See: https://docs.aws.amazon.com/pinpoint/latest/userguide/channels-voice-manage.html#channels-voice-manage-request-phone-numbers
var originationNumber = process.env.originationNumber;

// This message is spread across multiple lines for improved readability.

var messageType = "TRANSACTIONAL";

exports.handler = (event, context, callback) => {
  console.log("Received event:", event);
  validateNumber(event);
};

function validateNumber(event) {
  var destinationNumbers = event.arguments.destinationNumbers;
  var message = event.message;
  for (i = 0; i < destinationNumbers.length; i++) {
    let destinationNumber = destinationNumbers[i];

    if (destinationNumber.length == 10) {
      destinationNumber = "+1" + destinationNumber;
    }
    var params = {
      NumberValidateRequest: {
        IsoCountryCode: "US",
        PhoneNumber: destinationNumber,
      },
    };
    pinpoint.phoneNumberValidate(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
        //return data;
        if (data["NumberValidateResponse"]["PhoneTypeCode"] == 0) {
          sendEvent(destinationNumber, message);
        } else {
          console.log(
            "Received a phone number that isn't capable of receiving " +
              "SMS messages. No endpoint created."
          );
        }
      }
    });
  }
}

function sendEvent(destinationNumber, message) {
  var params = {
    ApplicationId: projectId,
    MessageRequest: {
      Addresses: {
        [destinationNumber]: {
          ChannelType: "SMS",
        },
      },
      MessageConfiguration: {
        SMSMessage: {
          Body: message,
          MessageType: messageType,
          OriginationNumber: originationNumber,
        },
      },
    },
  };

  pinpoint.sendUserMessages(params, function (err, data) {
    // If something goes wrong, print an error message.
    if (err) {
      console.log(err.message);
      // Otherwise, show the unique ID for the message.
    } else {
      console.log(
        "Message sent! " +
          data["MessageResponse"]["Result"][destinationNumber]["StatusMessage"]
      );
    }
  });
}
