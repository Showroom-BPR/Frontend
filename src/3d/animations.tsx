import { useAnimations } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useState } from "react";
import { AnimationClip } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type Props = {
  animations: AnimationClip[];
  asset: GLTF;
};

export const Animations = ({ animations, asset }: Props) => {
  const [currentAnimation, setCurrentAnimation] = useState<string>("");
  const { actions } = useAnimations(animations, asset.scene);
  const controls = () => {
    const options = Object.keys(actions);
    const controls = {};
    options.forEach((option) => {
      Object.assign(controls, {
        [option]: option,
      });
    });

    return controls;
  };

  const { animation } = useControls({
    animation: {
      value: "Idle",
      options: controls(),
    },
  });

  useEffect(() => {
    const animationName = animation as string;
    if (currentAnimation !== animationName) {
      const running = actions[currentAnimation];
      if (running) {
        running.stop();
      }
      setCurrentAnimation(animationName);
    }
    const animationToPlay = actions[animationName];
    if (!animationToPlay) {
      return;
    }
    animationToPlay.play();
  }, [animation]);

  return null;
};
