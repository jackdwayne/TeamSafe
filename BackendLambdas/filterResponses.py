import json
import boto3
from boto3.dynamodb.conditions import *
import uuid
from uuid import UUID
import os


applicationId = os.environ['applicationId']
originationNumber = os.environ['originationNumber']
messageType = "TRANSACTIONAL"
registeredKeyword = os.environ['registeredKeyword']
dynamodb = boto3.resource('dynamodb')
pinpoint = boto3.client('pinpoint',region_name='us-east-1')

def lambda_handler(event, context):
    print('Received event:', event);
    message = json.loads(event['Records'][0]['Sns']['Message'])
    words = message['messageBody']
    messageArray = words.split()
    for word in messageArray:
        validId = validateUuid(word)
        if validId == True:
            eventId = word
            messageArray.remove(word)
            words = ' '.join(messageArray)
            break
    
    words = words.lower()
    number = message['originationNumber']
    time = event['Records'][0]['Sns']['Timestamp']
    id = uuid.uuid4()
    id = str(id)
    
    
    empData = scanEmpTable(number)
    eventData = scanEventTable(eventId)
    if eventData['negativeResponse'] in words:
        type = 'negative'
    elif eventData['positiveResponse'] in words:
        type = 'positive'
    else:
        type = 'negative'
    
    createResponse(empData['id'],eventId,words, id, time, type, number);
    
    if type == 'negative':
        alertManager(empData,eventData['eventName'],words, eventData['managerPhone'])
        sendAutoReply(empData,eventData['eventName'],eventData['autoReplyNegMessage'], eventData['managerPhone'])
    if type == 'positive':
        sendAutoReply(empData,eventData['eventName'],eventData['autoReplyPosMessage'], eventData['managerPhone'])

    
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
    
def sendAutoReply(empData, eventName, autoReply, managerPhone):
    empPhone = empData['phone']
    if len(empPhone) == 10:
        empPhone = '+1' + empPhone
        
    empName = empData['firstName'] + ' ' + empData['lastName'] 
    try:
        response = pinpoint.send_messages(
        ApplicationId=applicationId,
        MessageRequest={
            'Addresses': {
                empPhone: {
                    'ChannelType': 'SMS'
                }
            },
            'MessageConfiguration': {
                'SMSMessage': {
                    'Body': autoReply,
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
             + response['MessageResponse']['Result'][empPhone]['MessageId'])
    
    
def alertManager(empData, eventName, words, managerPhone):
    if len(managerPhone) == 10:
        managerPhone = '+1' + managerPhone
    
    empPhone = empData['phone']
    if len(empPhone) == 10:
        empPhone = '+1' + empPhone
    empName = empData['firstName'] + ' ' + empData['lastName'] 
    alertManagerMessage = ' Your employee ' + empName + ' with phone number: ' + empPhone + '--- replied: \' ' + words + ' \' to your event named \' ' + eventName + ' \''
    print(managerPhone)
    print(alertManagerMessage)
    try:
        response = pinpoint.send_messages(
        ApplicationId=applicationId,
        MessageRequest={
            'Addresses': {
                managerPhone: {
                    'ChannelType': 'SMS'
                }
            },
            'MessageConfiguration': {
                'SMSMessage': {
                    'Body': alertManagerMessage,
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
             + response['MessageResponse']['Result'][managerPhone]['MessageId'])
    
def validateUuid(word):
    try:
        UUID(word , version=4)
    except ValueError:
        # If it's a value error, then the string 
        # is not a valid hex code for a UUID.
        return False
    return True


def scanEmpTable(number):
    table = dynamodb.Table('Employee-44h7d5qpxjedzkyu4u5qwlyemi-dev')
    scan_kwargs = {
        'FilterExpression': Attr('phone').eq(number)
    }
    response = table.scan(**scan_kwargs)
    return response['Items'][0]
    
def scanEventTable(id):
    table = dynamodb.Table('Event-44h7d5qpxjedzkyu4u5qwlyemi-dev')
    scan_kwargs = {
        'FilterExpression': Attr('id').contains(id)
    }
    response = table.scan(**scan_kwargs)
    return response['Items'][0]

def createResponse(empId, eventId, message, id, time, type, phone):
    table = dynamodb.Table('Response-44h7d5qpxjedzkyu4u5qwlyemi-dev')
    response = table.put_item(
       Item={
            'id': id,
            '__typename': 'Response',
            'createdAt': time,
            'message': message,
            'employeeID': empId,
            'eventID' : eventId,
            'updatedAt': time,
            'responseType': type,
            'phone' : phone
        }
    )
    
