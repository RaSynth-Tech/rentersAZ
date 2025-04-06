import { NextResponse } from 'next/server';
import s3Client from '../../../../lib/s3-client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function POST(request: Request) {
  const { fileName, fileType } = await request.json();

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
  };

  const command = new PutObjectCommand(params);

  try {
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    return NextResponse.json({ url: presignedUrl });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json({ error: 'Error generating presigned URL' }, { status: 500 });
  }
}
