import { S3Client } from '@aws-sdk/client-s3';
import config from "../config/dbconfig";


const AWS_ACCESS_KEY_ID = config.development.aws_access_key_id as string;
const AWS_SECRET_ACCESS_KEY = config.development.aws_secret_access_key as string;
const AWS_DEFAULT_REGION = config.development.aws_default_region as string;
const AWS_BUCKET = config.development.aws_bucket as string;
const AWS_USE_PATH_STYLE_ENDPOINT = config.development.aws_use_path_style_endpoint as string;


const s3Client = new S3Client({
        region: AWS_DEFAULT_REGION, // Reemplazar con la región de tu bucket en AWS S3
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID, // Reemplazar con tu accessKeyId de AWS
            secretAccessKey: AWS_SECRET_ACCESS_KEY, // Reemplazar con tu secretAccessKey de AWS
        },
    });

export default s3Client