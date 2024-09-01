import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client();

const getPictureUrl = async (objectKey: string) => {
  const url = await getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: "my-introduction-resources",
      Key: objectKey,
    }),
    {
      expiresIn: 3600,
    }
  );
  return url;
};

export const handler = async () => {
  const listObjectsCommandResponse = await client.send(
    new ListObjectsV2Command({
      Bucket: "my-introduction-resources",
      Prefix: "picture",
    })
  );

  const processes = listObjectsCommandResponse.Contents!.map(
    async (Content) => Content.Key && (await getPictureUrl(Content.Key))
  );
  const urls: (string | undefined)[] = await Promise.all([...processes]);

  return {
    statusCode: 200,
    body: JSON.stringify(urls),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
