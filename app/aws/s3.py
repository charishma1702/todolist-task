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
