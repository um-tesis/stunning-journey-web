import {S3} from 'aws-sdk';
import {NextApiRequest, NextApiResponse} from 'next';

// Initialize S3 client
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const fileType = req.query.fileType || 'image/jpeg'; // you can allow the client to specify fileType

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: `${Date.now()}.jpg`, // Change this to be more unique and specific to your use case
      Expires: 60,
      ContentType: fileType,
    };

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);

    res.status(200).json({uploadURL, key: params.Key});
  } catch (error) {
    console.error('Error generating pre-signed URL', error);
    res.status(500).json({error: 'Failed to generate pre-signed URL'});
  }
}
