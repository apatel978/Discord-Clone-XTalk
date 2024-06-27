from flask import Blueprint, request, jsonify
import boto3
from botocore.exceptions import NoCredentialsError

upload_routes = Blueprint('upload', __name__)

# Initialize a session using Amazon S3
s3 = boto3.client('s3')

def upload_to_aws(local_file, bucket, s3_file):
    try:
        s3.upload_file(local_file, bucket, s3_file)
        return True
    except FileNotFoundError:
        return False
    except NoCredentialsError:
        return False

@upload_routes.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file:
        file.save(file.filename)  # Save file to the local filesystem
        uploaded = upload_to_aws(file.filename, 'crosstalkappbuck', file.filename)  
        if uploaded:
            return jsonify({'message': 'Upload Successful'})
        else:
            return jsonify({'error': 'Upload Failed'})
