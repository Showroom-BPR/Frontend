import { useLogin } from "../auth/auth-provider";

type RawImage = {
  dataStream: string;
  name: string;
};

const backend = import.meta.env.DEV
  ? "http://showroom-backend.eu-north-1.elasticbeanstalk.com"
  : "";

export const useFetcher = () => {
  const { authToken } = useLogin();

  const handleAssetFetch = async () => {
    const rawResponse = await fetch(
      `${backend}/3DAsset?productId=lego_dead_pool`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const response = await rawResponse.json();
    const byteData: number[] = Object.values(response);
    const bytes = new Int8Array(byteData);

    return bytes;
  };

  const handleWatermarkFetch = async () => {
    const rawResponse = await fetch(`${backend}/Watermark`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const response: string = await rawResponse.text();

    return response;
  };

  const handleBackgroundFetch = async () => {
    const rawResponse = await fetch(`${backend}/Backgrounds`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const array: RawImage[] = await rawResponse.json();
    const results = array.map(({ dataStream }) => dataStream);

    return results;
  };

  return { handleAssetFetch, handleWatermarkFetch, handleBackgroundFetch };
};
