import { useControls } from "leva";
import { useEffect } from "react";
import { RawImage } from "../common/fetcher";

type Props = {
  bg: RawImage[];
};

export const Backgrounds = ({ bg }: Props) => {
  const items = () => {
    const options = {};
    bg.forEach((background) =>
      Object.assign(options, {
        [background.name]: background.name,
      })
    );
    return options;
  };

  const { Backgrounds } = useControls({
    Backgrounds: {
      value: bg[0].name,
      options: items(),
    },
  });

  useEffect(() => {
    if (bg.length === 0) return;
    const background = bg.find((b) => b.name === Backgrounds);
    if (!background) return;
    document.body.style.backgroundImage = `url(data:image/png;base64,${background.dataStream})`;
  }, [Backgrounds]);

  return null;
};
