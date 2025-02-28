import boto3
import os
from dotenv import load_dotenv

load_dotenv()  # Load AWS credentials from .env file
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")

AWS_REGION = "ap-south-1"
AWS_BUCKET_NAME = "todoapis3bucket"

s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)


# def upload_file_to_s3(file, filename, folder="uploads"):
#     """Uploads a file to S3 and returns the file URL"""
#     try:
#         s3_client.upload_fileobj(file.file, AWS_BUCKET_NAME, f"{folder}/{filename}")
#         file_url = f"https://{AWS_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{folder}/{filename}"
#         return file_url
#     except NoCredentialsError:
#         return {"error": "AWS credentials not found"}
