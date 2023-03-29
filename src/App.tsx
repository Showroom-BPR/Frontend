import {
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

function App() {
  const [gltf, setGltf] = useState<GLTF>();
  const [data, setData] = useState<Int8Array>();

  const loader = new GLTFLoader();

  useEffect(() => {
    const f = async () => {
      const handleFetch = async (res: Response) => {
        const response = await res.json();
        const byteData: number[] = Object.values(response);
        const view = new Int8Array(byteData);
        setData(view);
      };

      const handleError = async (err: Error) => {
        console.error("Error fetching model.", err);
      };

      fetch("http://localhost:3000/3dmodel").then(handleFetch, handleError);
    };

    void f();
  }, []);

  useEffect(() => {
    if (!data || !data.buffer) return;

    loader.parse(
      data.buffer,
      "",
      (e) => {
        setGltf(e);
      },
      (e) => {
        console.error(e);
      }
    );
  }, [data]);

  return (
    <Suspense fallback={null}>
      {gltf && (
        <primitive
          object={gltf.scene}
          position={[0, -1, 0]}
          scale={0.3}
          rotation={[0, 0, 0]}
        />
      )}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[-10, 10, 5]}
        shadow-mapSize={[256, 256]}
        shadow-bias={-0.0001}
        castShadow
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10]} />
      </directionalLight>
      <EffectComposer>
        <DepthOfField target={[0, 0, 0]} bokehScale={8} />
      </EffectComposer>
      <AccumulativeShadows
        temporal
        frames={Infinity}
        alphaTest={1}
        blend={200}
        limit={1500}
        scale={25}
        position={[0, -0.05, 0]}
      >
        <RandomizedLight
          amount={1}
          mapSize={512}
          radius={5}
          ambient={0.5}
          position={[-10, 10, 5]}
          size={10}
          bias={0.001}
        />
      </AccumulativeShadows>
      <OrbitControls
        autoRotate
        autoRotateSpeed={1}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 4}
      />
    </Suspense>
  );
}

export default App;
