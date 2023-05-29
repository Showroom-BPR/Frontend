import { Stage } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useControls } from "leva";
import { Model } from "./model";
import { Backgrounds } from "./backgrounds";
import { Canvas } from "@react-three/fiber";
import { Watermark } from "./watermark";
import { useFetcher } from "../common/fetcher";

function App() {
  const [backgrounds, setBackgrounds] = useState<string[]>([]);
  const { handleBackgroundFetch } = useFetcher();
  const { autoSpin, rotationSpeed, shadows } = useControls({
    autoSpin: { value: true, label: "Auto spin" },
    shadows: { value: true, label: "Shadows" },
    rotationSpeed: {
      value: 1,
      min: 0,
      max: 10,
      step: 1,
      label: "Rotatio speed",
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
        <Stage preset={"rembrandt"} shadows={shadows} adjustCamera>
          <Model autoSpin={autoSpin} rotationSpeed={rotationSpeed} />
        </Stage>
        <Watermark />
        <Backgrounds bg={backgrounds} />
      </Suspense>
    </Canvas>
  );
}

export default App;
