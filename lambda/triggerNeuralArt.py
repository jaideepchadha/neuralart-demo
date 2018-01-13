from __future__ import print_function

import json
import urllib
#import requests
import boto3

print('Loading function')

s3 = boto3.client('s3')

HOST = 'http://ec2-52-66-153-169.ap-south-1.compute.amazonaws.com:5002/neuralart?file='

def lambda_handler(event, context):

    # Get the object from the event and show its content type
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.unquote_plus(event['Records'][0]['s3']['object']['key'].encode('utf8'))
    print("KEY: " + key)
    pos = key.find('/', 0, len(key))
    fileName = key[pos+1:]
    print("FILENAME: " + fileName)
    try:
        from urllib2 import urlopen

        url = HOST + fileName
        print("URL: " + url)
        urlopen(url)
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e
