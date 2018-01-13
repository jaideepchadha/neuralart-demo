import boto3
import botocore
import os
import urllib
import numpy as np
from skimage import io
import importlib
import nstyle


ACCESS_KEY = 'AKIAJ2SS5MZYD3ADH6QA'
SECRET_KEY = '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'
INPUT_BUCKET_NAME = 'ai-conclave'
OUTPUT_BUCKET_NAME = 'ai-conclave-output'
KEY = 'conclave-bucket/newtest.jpg'
LOCAL_FILE = 'input/newtest.jpg'
s3 = boto3.resource('s3', aws_access_key_id=ACCESS_KEY,
                aws_secret_access_key=SECRET_KEY)

def main(fileName):
    KEY = 'images/' + fileName
    print('***** inputFile: ' + KEY)
    downloadFromS3(fileName)
    generateArt()
    uploadToS3(fileName)

def downloadFromS3(fileName):
    KEY = 'images/' + fileName
    try:
        s3.Bucket(INPUT_BUCKET_NAME).download_file(KEY, LOCAL_FILE)
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("The object does not exist.")
        else:
            raise

def generateArt():
	cnn_path = 'model/vgg19.params'
	style_path = "input/starry_night.jpg"
	content_path = LOCAL_FILE
	style_img = io.imread(style_path)
	content_img = io.imread(content_path)

	args = nstyle.get_args([])
	args.stop_eps = 0.005
	args.max_size = 600
	# content image weight. A larger value means more original content.
	args.content_weight = 10.0

	# Style image weight. A larger value means more style.
	args.style_weight = 1.0

	# Initial learning rate. Change this affacts the result.
	args.lr = 0.001

	# Learning rate schedule.  How often to decrease and by how much
	args.lr_sched_delay = 50
	args.lr_sched_factor = 0.6

	# How often to update the notebook display
	args.save_epochs = 50

	# How long to run for
	args.max_num_epochs = 1000

	# Remove noise. The amount of noise to remove.
	args.remove_noise = 0.02

	args.content_image = content_path
	args.style_image = style_path

	args.output_dir = 'output/'

	nstyle.train_nstyle(args)


def uploadToS3(fileName):
    outputFile = 'output/' + fileName
    #data = open(outputFile, 'rb')
    data = open('output/final.jpg', 'rb')
    objectKey = 'images/final_' + fileName
	#s3.Bucket(BUCKET_NAME).put_object(Key='conclave-bucket/final.jpg', Body=data)
    s3.Bucket(OUTPUT_BUCKET_NAME).put_object(Key=objectKey, Body=data)

#if __name__ == "__main__":
#    downloadFromS3('newtest.jpg')
#    generateArt()
#    uploadToS3('newtest.jpg')
