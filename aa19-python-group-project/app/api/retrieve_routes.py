from flask import Blueprint, send_file, jsonify
import boto3
from botocore.exceptions import NoCredentialsError, ClientError

retrieve_routes = Blueprint('retrieve', __name__)

# Initialize a session using Amazon S3
s3 = boto3.client('s3', region_name='us-east-2')

@retrieve_routes.route('/retrieve/<path:key>', methods=['GET'])
def retrieve_image(key):
    try:
        # Generate a pre-signed URL for the S3 object
        url = s3.generate_presigned_url(
            ClientMethod='get_object',
            Params={
                'Bucket': 'crosstalkappbuck',
                'Key': key
            },
            ExpiresIn=3600,  # URL expires in 1 hour (adjust as needed)
            HttpMethod='GET'
        )
        return jsonify({'url': url})
    except NoCredentialsError:
        return jsonify({'error': 'Credentials not available'})
    except ClientError as e:
        return jsonify({'error': e.response['Error']['Message']})
