import { useEffect, useState } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLogin } from "../auth/auth-provider";
import { OrbitControls } from "@react-three/drei";
import { useNavigate, useParams } from "react-router-dom";
import { useFetcher } from "../common/fetcher";
import { Animations } from "./animations";

type Props = {
  autoSpin: boolean;
  rotationSpeed: number;
};

export const Model = ({ autoSpin, rotationSpeed }: Props) => {
  const [gltf, setGltf] = useState<GLTF>();
  const [raw, setRaw] = useState<Int8Array>();
  const loader = new GLTFLoader();
  const { currentUser } = useLogin();
  const navigate = useNavigate();
  const { handleAssetFetch } = useFetcher();
  const { id } = useParams();

  const onError = (e: ErrorEvent | Error) => {
    console.error(e);
  };

  useEffect(() => {
    const f = async () => {
      if (!currentUser) {
        navigate("/login");
        return;
      }
      console.log(id);
      if (!id) {
        navigate("/products");
        return;
      }
      const result = await handleAssetFetch(id);
      setRaw(result);
    };

    void f();
  }, []);

  useEffect(() => {
    if (!raw || !raw.buffer || gltf) return;

    loader.parse(raw.buffer, "", setGltf, onError);
  }, [raw]);

  if (!gltf) return null;

  return (
    <primitive
      object={gltf.scene}
      position={[0, 0, 0]}
      scale={0.3}
      rotation={[0, 0, 0]}
    >
      <OrbitControls
        autoRotate={autoSpin}
        autoRotateSpeed={rotationSpeed}
        enablePan
        enableZoom
        enableDamping
      />
      <Animations animations={gltf.animations} asset={gltf} />
    </primitive>
  );
};
