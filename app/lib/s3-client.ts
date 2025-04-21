import { S3Client } from '@aws-sdk/client-s3';


console.log(process.env.AWS_REGION);
console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);

const s3Client = new S3Client({
  region: process.env.AWS_REGION as string, // Assert as string
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string, // Assert as string
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string, // Assert as string
  },
});

export default s3Client;
