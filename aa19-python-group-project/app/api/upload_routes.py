from flask import Blueprint, request, jsonify
import boto3
from botocore.exceptions import NoCredentialsError
from werkzeug.utils import secure_filename
import os
upload_routes = Blueprint('upload', __name__)

# Initialize a session using Amazon S3
s3 = boto3.client('s3')

def upload_to_aws(local_file, bucket, s3_file):
    try:
        s3.upload_file(local_file, bucket, s3_file)
        file_url = f"https://{bucket}.s3.amazonaws.com/{s3_file}"
        return file_url
    except FileNotFoundError:
        print("The file was not found")
        return None
    except NoCredentialsError:
        print("Credentials not available")
        return None
    except Exception as e:
        print(f"Upload failed: {e}")
        return None

@upload_routes.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file:
        filename = secure_filename(file.filename)
        temp_file_path = os.path.join('/tmp', filename)
        file.save(temp_file_path)  # Save file to a temporary location
        uploaded_url = upload_to_aws(temp_file_path, 'crosstalkappbuck', filename)
        # Clean up the temp file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

        if uploaded_url:
            return jsonify({'message': 'Upload Successful', 'imageUrl': uploaded_url})
        else:
            return jsonify({'error': 'Upload Failed'})

    return jsonify({'error': 'File upload failed'})
