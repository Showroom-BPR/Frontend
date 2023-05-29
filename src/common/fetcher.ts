import { useLogin } from "../auth/auth-provider";

type RawImage = {
  name: string;
  dataStream: Buffer;
};

const backend = import.meta.env.DEV
  ? "http://showroom-backend.eu-north-1.elasticbeanstalk.com"
  : "";

export const useFetcher = () => {
  const { authToken } = useLogin();

  const handleAssetFetch = async () => {
    const rawResponse = await fetch(`${backend}/3DAsset?productId=lego_man`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const response = await rawResponse.json();
    const byteData: number[] = Object.values(response);
    const bytes = new Int8Array(byteData);

    return bytes;
  };

  const handleWatermarkFetch = async () => {
    const rawResponse = await fetch(`${backend}/watermark`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const response: RawImage = await rawResponse.json();

    return Buffer.from(response.dataStream).toString("base64");
  };

  const handleBackgroundFetch = async () => {
    const rawResponse = await fetch(`${backend}/background`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const array: RawImage[] = await rawResponse.json();
    const results = array.map((item) =>
      Buffer.from(item.dataStream).toString("base64")
    );

    return results;
  };

  return { handleAssetFetch, handleWatermarkFetch, handleBackgroundFetch };
};
