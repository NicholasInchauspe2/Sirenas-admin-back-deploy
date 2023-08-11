import dotenv from "dotenv";

dotenv.config()

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    aws_default_region: process.env.AWS_DEFAULT_REGION,
    aws_bucket: process.env.AWS_BUCKET,
    aws_use_path_style_endpoint: process.env.AWS_USE_PATH_STYLE_ENDPOINT,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    aws_default_region: process.env.AWS_DEFAULT_REGION,
    aws_bucket: process.env.AWS_BUCKET,
    aws_use_path_style_endpoint: process.env.AWS_USE_PATH_STYLE_ENDPOINT,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    aws_default_region: process.env.AWS_DEFAULT_REGION,
    aws_bucket: process.env.AWS_BUCKET,
    aws_use_path_style_endpoint: process.env.AWS_USE_PATH_STYLE_ENDPOINT,
  },
};