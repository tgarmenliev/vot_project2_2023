import json
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = dynamodb.Table('TravelPlanner')

def lambda_handler(event, context):
    try:
        # Parse the request body
        response = table_name.scan()
        plans = response.get('Items', [])
        
        # Create a new item for the travel plan
        items_list = [{
            'ID': item['EventName'],
            'EventName': item['EventName'],
            'EventDescription': item['EventDescription'],
            'EventDate': item['EventDate'],
            'StartLocation': item['StartLocation'],
            'Destination': item['Destination'],
            'DepartureTime': item['DepartureTime'],
            'ArrivalTime': item['ArrivalTime'],
            'TripNumber': item['TripNumber'],
            'Transport': item['Transport']
        } for item in plans]
        
        # Return a success response
        return {
            'statusCode': 200,
            'body': json.dumps(items_list)
        }
    except Exception as e:
        # Return an error response
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
