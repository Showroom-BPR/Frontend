import { OrbitControls, Stage } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function App() {
  const [gltf, setGltf] = useState<GLTF>();
  const [raw, setRaw] = useState<Int8Array>();
  const loader = new GLTFLoader();

  const onError = (e: ErrorEvent | Error) => {
    console.error(e);
  };

  useEffect(() => {
    const f = async () => {
      const handleFetch = async (res: Response) => {
        const response = await res.json();
        const byteData: number[] = Object.values(response);
        const bytes = new Int8Array(byteData);
        setRaw(bytes);
      };

      fetch("http://localhost:3000/3dmodel").then(handleFetch, onError);
    };

    void f();
  });

  useEffect(() => {
    if (!raw || !raw.buffer) return;

    loader.parse(raw.buffer, "", setGltf, onError);
  }, [raw]);

  return (
    <Suspense fallback={null}>
      <Stage preset={"rembrandt"} adjustCamera shadows={"contact"}>
        {gltf && (
          <primitive
            object={gltf.scene}
            position={[0, -1, 0]}
            scale={0.3}
            rotation={[0, 0, 0]}
          />
        )}
        <OrbitControls
          autoRotate
          autoRotateSpeed={1}
          enablePan
          enableZoom
          enableDamping
        />
      </Stage>
    </Suspense>
  );
}

export default App;
