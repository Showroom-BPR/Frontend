import { Html } from "@react-three/drei";
import { useControls } from "leva";
import { useFetcher } from "../common/fetcher";
import { useEffect, useState } from "react";

export const Watermark = () => {
  const [watermarkData, setWatermarkData] = useState<string | undefined>();
  const { handleWatermarkFetch } = useFetcher();
  const { showWatermark } = useControls({
    showWatermark: {
      value: false,
      label: "Show watermark",
    },
  });

  useEffect(() => {
    const f = async () => {
      const base64 = await handleWatermarkFetch();
      setWatermarkData(base64);
    };

    void f();
  }, []);

  if (!showWatermark || !watermarkData) return null;

  return (
    <Html
      style={{
        width: "100vw",
        height: "100vh",
      }}
      fullscreen
      prepend
    >
      <img
        src={watermarkData}
        draggable={false}
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </Html>
  );
};
