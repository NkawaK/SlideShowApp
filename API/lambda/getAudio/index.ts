import { APIGatewayEvent } from "aws-lambda";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client();

const getAudioUrl = async (objectKey: string) => {
  const url = await getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: "my-introduction-resources",
      Key: `audio/${objectKey}.mp3`,
    }),
    {
      expiresIn: 3600,
    }
  );
  return url;
};

export const handler = async (event: APIGatewayEvent) => {
  const { audioKey } = event.body ? JSON.parse(event.body) : "";
  const url = audioKey ? await getAudioUrl(audioKey) : "";

  return {
    statusCode: 200,
    body: JSON.stringify(url),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
