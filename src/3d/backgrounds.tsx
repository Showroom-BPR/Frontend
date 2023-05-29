import { useControls, buttonGroup } from "leva";
import {
  ButtonGroupInputOpts,
  ButtonGroupOpts,
} from "leva/dist/declarations/src/types";
import { useEffect, useState } from "react";

type Props = {
  bg: string[];
};

export const Backgrounds = ({ bg }: Props) => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const buttons = () => {
    const array = bg.map((_, idx) => {
      const button: ButtonGroupOpts = {
        ["" + idx]: () => {
          setBackgroundIndex(idx);
        },
      };

      return button;
    });

    const buttonGroup: ButtonGroupInputOpts = {};
    array.forEach((button) => Object.assign(buttonGroup, button));

    return buttonGroup;
  };

  useControls({
    Backgrounds: buttonGroup(buttons()),
  });

  useEffect(() => {
    return () => {
      document.body.style.backgroundImage = "none";
    };
  });

  useEffect(() => {
    if (bg.length === 0) return;
    const background = bg[backgroundIndex];
    document.body.style.backgroundImage = `url(data:image/png;base64,${background})`;
  }, [backgroundIndex]);

  return null;
};
