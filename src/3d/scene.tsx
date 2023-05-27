import { OrbitControls, Stage } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { button, useControls } from "leva";
import { useLogin } from "../auth/auth-provider";
import { useNavigate } from "react-router-dom";

const backgrounds = ["1.jpg", "2.jpg", "3.jpg"];

const backend = import.meta.env.DEV ? "http://localhost:80" : "";

function App() {
  const [gltf, setGltf] = useState<GLTF>();
  const [raw, setRaw] = useState<Int8Array>();
  const loader = new GLTFLoader();
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const { currentUser, authToken } = useLogin();
  const navigate = useNavigate();
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
    background: button(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
    }),
  });

  useEffect(() => {
    const background = backgrounds[backgroundIndex];
    document.body.style.backgroundImage = `url(${background})`;
  }, [backgroundIndex]);

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

      if (!currentUser) {
        navigate("/login");
        return;
      }

      fetch(
        `${backend}/3DAsset?username=${currentUser.getUsername()}&productId=lego_man`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      ).then(handleFetch, onError);
    };

    void f();
  }, []);

  useEffect(() => {
    if (!raw || !raw.buffer || gltf) return;

    loader.parse(raw.buffer, "", setGltf, onError);
  }, [raw]);

  return (
    <Suspense fallback={null}>
      <Stage preset={"rembrandt"} adjustCamera shadows={shadows}>
        {gltf && (
          <primitive
            object={gltf.scene}
            position={[0, -1, 0]}
            scale={0.3}
            rotation={[0, 0, 0]}
          />
        )}
        <OrbitControls
          autoRotate={autoSpin}
          autoRotateSpeed={rotationSpeed}
          enablePan
          enableZoom
          enableDamping
        />
      </Stage>
    </Suspense>
  );
}

export default App;
