import json
import boto3
import time
from boto3.dynamodb.conditions import *
import uuid
from uuid import UUID
from datetime import datetime
import dateutil
from dateutil import *
import os

applicationId = os.environ['applicationId']
originationNumber = os.environ['originationNumber']
messageType = "TRANSACTIONAL"
registeredKeyword = os.environ['registeredKeyword']
dynamodb = boto3.resource('dynamodb')
pinpoint = boto3.client('pinpoint',region_name='us-east-1')


my_date = datetime.now()

def lambda_handler(event, context):
    # scan event table for active events, store their team, phone numbers, message, resend time
    # scan response table for event ids, if responded remove number from resend list
    eventData = scanEventTable();
    print(my_date.isoformat())
    for i in eventData:
        employeeNums = []
        respondedNums = []
        event = i
        message = event['eventMessage']
        positiveResponse = event['positiveResponse']
        negativeResponse = event['negativeResponse']
        sendMessage = 'This is a reminder to reply to an event, your manager sent you this message: ' + message  + " ------ RESPONSE REQUIRED, reply with one of the previous responses sent you, thank you"
        tMemData = scanTeamMemberTable(event['teamID'])
        posMessage = positiveResponse + ' ' + event['id']
        negMessage = negativeResponse + ' ' + event['id']
        for j in tMemData:
            empPhone = scanEmpTable(j['employeeID'])
            print(empPhone)
            employeeNums.append(empPhone)
            
        respData = scanRespTable(event['id'])
        print('event id is : ', event['id'])
        for k in respData:
            responseNum = k['phone']
            
            respondedNums.append(responseNum)
            
        print(set(respondedNums))
        resendNums = list((set(employeeNums)-set(respondedNums)))
            
        print (resendNums)
        if resendNums != []:
            for l in resendNums:
                destinationNumber = l
                resendEvent(destinationNumber, sendMessage)
        else:
            completeEvent(event['id'])
        
        
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
    
def completeEvent(eventID):
    table = dynamodb.Table('Event-44h7d5qpxjedzkyu4u5qwlyemi-dev')
    response = table.update_item(
        Key={
            'id': eventID,
        },
        UpdateExpression="set eventStatus=:r",
        ExpressionAttributeValues={
            ':r': 'Complete',
        },
        ReturnValues="UPDATED_NEW"
    )
    
    

def scanRespTable(id):
    table = dynamodb.Table('Response-44h7d5qpxjedzkyu4u5qwlyemi-dev')
    scan_kwargs = {
        'FilterExpression': Attr('eventID').eq(id)
    }
    print('Scanning response table')
    response = table.scan(**scan_kwargs)
    return response['Items']
    
def scanEventTable():
    table = dynamodb.Table('Event-44h7d5qpxjedzkyu4u5qwlyemi-dev')
    scan_kwargs = {
        'FilterExpression': Attr('eventStatus').contains('Active')
    }
    print('Scanning event table')
    response = table.scan(**scan_kwargs)

    return response['Items']

def scanTeamMemberTable(teamID):
    table = dynamodb.Table('TeamMember-44h7d5qpxjedzkyu4u5qwlyemi-dev')
    scan_kwargs = {
        'FilterExpression': Attr('teamID').contains(teamID)
    }
    response = table.scan(**scan_kwargs)

    return response['Items']

def scanEmpTable(number):
    table = dynamodb.Table('Employee-44h7d5qpxjedzkyu4u5qwlyemi-dev')
    scan_kwargs = {
        'KeyConditionExpression': Key('id').eq(number)
    }
    response = table.query(**scan_kwargs)
    return response['Items'][0]['phone']
    
def resendEvent(destinationNumber, message) :
    if len(destinationNumber) == 10 :
      destinationNumber = "+1" + destinationNumber;
    
    try:
        response = pinpoint.send_messages(
        ApplicationId= applicationId,
        MessageRequest={
            'Addresses': {
                destinationNumber: {
                    'ChannelType': 'SMS'
                }
            },
            'MessageConfiguration': {
                'SMSMessage': {
                    'Body': message,
                    'Keyword': registeredKeyword,
                    'MessageType': messageType,
                    'OriginationNumber': originationNumber,
                }
            }
        }
    )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Message sent! Message ID: "
             + response['MessageResponse']['Result'][destinationNumber]['MessageId'])
  