import json
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'TravelPlanner'

def lambda_handler(event, context):
    try:
        # Parse the request body
        #plan = json.loads(event['body'])
        
        # Create a new item for the travel plan
        item = {
            'ID': event['eventName'],
            'EventName': event['eventName'],
            'EventDescription': event['eventDescription'],
            'EventDate': event['eventDate'],
            'StartLocation': event['startLocation'],
            'Destination': event['destination'],
            'DepartureTime': event['departureTime'],
            'ArrivalTime': event['arrivalTime'],
            'TripNumber': event['tripNumber'],
            'Transport': event['transport']
        }
        
        # Store the item in the DynamoDB table
        dynamodb.Table(table_name).put_item(Item=item)
        
        # Return a success response
        response = {
            'statusCode': 200,
            'body': json.dumps({'message': 'Travel plan submitted successfully'})
        }
    except Exception as e:
        # Return an error response
        response = {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
    
    return response