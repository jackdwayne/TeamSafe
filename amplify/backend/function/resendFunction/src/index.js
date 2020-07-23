/* Amplify Params - DO NOT EDIT
	API_AWSTEAMSAFE_EMPLOYEETABLE_ARN
	API_AWSTEAMSAFE_EMPLOYEETABLE_NAME
	API_AWSTEAMSAFE_EVENTTABLE_ARN
	API_AWSTEAMSAFE_EVENTTABLE_NAME
	API_AWSTEAMSAFE_GRAPHQLAPIENDPOINTOUTPUT
	API_AWSTEAMSAFE_GRAPHQLAPIIDOUTPUT
	API_AWSTEAMSAFE_RESPONSETABLE_ARN
	API_AWSTEAMSAFE_RESPONSETABLE_NAME
	API_AWSTEAMSAFE_TEAMMEMBERTABLE_ARN
	API_AWSTEAMSAFE_TEAMMEMBERTABLE_NAME
	API_AWSTEAMSAFE_TEAMTABLE_ARN
	API_AWSTEAMSAFE_TEAMTABLE_NAME
	AUTH_AWSTEAMSAFEFCD90582FCD90582_USERPOOLID
	ENV
	FUNCTION_SENDSMSEVENTFUNCTION_NAME
	REGION
Amplify Params - DO NOT EDIT */

const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;

exports.handler = async (event) => {
  try {
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_KEY
      },
      data: {
        query: print(listEvents),
      }
    });
    const body = {
        graphqlData: graphqlData.data.data.listTodos
    }
    return {
        statusCode: 200,
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    }
  } catch (err) {
    console.log('error posting to appsync: ', err);
  } 
}
