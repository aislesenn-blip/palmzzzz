import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || 'mock';
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || 'mock';
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || 'mock';
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'tweetstore-assets';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || 'https://pub-mock.r2.dev';

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token || !(await verifyToken(token))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { filename, contentType } = await req.json();
        const key = `${Date.now()}-${filename}`;

        const command = new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: key,
            ContentType: contentType,
        });

        if (R2_ACCOUNT_ID === 'mock') {
            return NextResponse.json({
                uploadUrl: 'http://localhost:3000/api/mock-upload',
                publicUrl: `${R2_PUBLIC_URL}/${key}`
            });
        }

        const uploadUrl = await getSignedUrl(S3, command, { expiresIn: 3600 });
        const publicUrl = `${R2_PUBLIC_URL}/${key}`;

        return NextResponse.json({ uploadUrl, publicUrl });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
