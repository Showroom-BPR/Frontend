import { useLogin } from "../auth/auth-provider";

export type RawImage = {
  dataStream: string;
  name: string;
};

export const useFetcher = () => {
  const { authToken } = useLogin();
  const getBackend = () => {
    if (import.meta.env.DEV) {
      return "http://localhost:80";
    }

    const url = import.meta.env.REACT_APP_BACKEND;
    if (!url) {
      throw new Error("No backend URL specified for the environment");
    }

    return url;
  };
  const backend = getBackend();

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

    return array;
  };

  return { handleAssetFetch, handleWatermarkFetch, handleBackgroundFetch };
};
