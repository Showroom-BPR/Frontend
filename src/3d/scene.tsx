import { Stage } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useControls } from "leva";
import { Model } from "./model";
import { Backgrounds } from "./backgrounds";
import { Canvas } from "@react-three/fiber";
import { Watermark } from "./watermark";
import { RawImage, useFetcher } from "../common/fetcher";

function App() {
  const [backgrounds, setBackgrounds] = useState<RawImage[]>([]);
  const { handleBackgroundFetch } = useFetcher();
  const { autoSpin, rotationSpeed } = useControls({
    autoSpin: { value: true, label: "Auto spin" },
    rotationSpeed: {
      value: 1,
      min: 0,
      max: 10,
      step: 1,
      label: "Rotation speed",
    },
  });

  useEffect(() => {
    const f = async () => {
      const bg = await handleBackgroundFetch();

      setBackgrounds(bg);
    };

    void f();
  }, []);

  return (
    <Canvas
      gl={{ antialias: true }}
      style={{
        zIndex: 1,
      }}
    >
      <Suspense fallback={null}>
        <Stage preset={"rembrandt"} adjustCamera>
          <Model autoSpin={autoSpin} rotationSpeed={rotationSpeed} />
        </Stage>
        <Watermark />
        {backgrounds.length > 0 && <Backgrounds bg={backgrounds} />}
      </Suspense>
    </Canvas>
  );
}

export default App;
