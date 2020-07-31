/* Amplify Params - DO NOT EDIT
	API_AWSTEAMSAFE_GRAPHQLAPIENDPOINTOUTPUT
	API_AWSTEAMSAFE_GRAPHQLAPIIDOUTPUT
	AUTH_AWSTEAMSAFEFCD90582FCD90582_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

require('isomorphic-fetch');
const AWS = require('aws-sdk/global');
const AUTH_TYPE = require('aws-appsync').AUTH_TYPE;
const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
 
// Replace QUIZBUDDY with your GQL API name below in the URL
const config = {
  url: process.env.API_AWSTEAMSAFE_GRAPHQLAPIENDPOINTOUTPUT,
  region: process.env.AWS_REGION,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: AWS.config.credentials,
  },
  disableOffline: true
};

const getEvent = /* GraphQL */ 
`
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      managerName
      managerEmail
      managerPhone
      alertManagerSetting
      eventMessage
      autoReplyPosMessage
      autoReplyNegMessage
      positiveResponse
      negativeResponse
      eventStart
      eventEnd
      noResponseResendTime
      eventStatus
      eventName
      teamID
      team {
        id
        managerName
        managerEmail
        managerPhone
        teamName
        teamMembers {
          nextToken
        }
        events {
          nextToken
        }
        createdAt
        updatedAt
      }
      longCode
      responses {
        items {
          id
          message
          phone
          eventID
          employeeID
          responseTime
          responseType
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

const createResponse = /* GraphQL */ 
`
  mutation CreateResponse(
    $input: CreateResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    createResponse(input: $input, condition: $condition) {
      id
      message
      phone
      eventID
      event {
        id
        managerName
        managerEmail
        managerPhone
        alertManagerSetting
        eventMessage
        autoReplyPosMessage
        autoReplyNegMessage
        positiveResponse
        negativeResponse
        eventStart
        eventEnd
        noResponseResendTime
        eventStatus
        eventName
        teamID
        team {
          id
          managerName
          managerEmail
          managerPhone
          teamName
          createdAt
          updatedAt
        }
        longCode
        responses {
          nextToken
        }
        createdAt
        updatedAt
      }
      employee {
        id
        email
        phone
        firstName
        lastName
        memberOfTeam {
          nextToken
        }
        createdAt
        updatedAt
      }
      employeeID
      responseTime
      responseType
      createdAt
      updatedAt
    }
  }
`;
 
 
exports.handler = (event, context, callback) => {

    console.log(event)
    const payload = JSON.parse(event['Records'][0]["Sns"]['Message']);
    console.log(payload)
    const message = payload.messageBody;
    console.log(message)


    
     
  
    
  };