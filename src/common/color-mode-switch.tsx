import { Button, useColorMode } from "@chakra-ui/react";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";

export const ColorModeWidget = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const icon =
    colorMode === "light" ? (
      <BsFillSunFill fill="black" size="24px" />
    ) : (
      <BsFillMoonStarsFill fill="white" size="24px" />
    );

  return (
    <Button
      position="absolute"
      bottom="32px"
      right="32px"
      borderRadius="50%"
      width="64px"
      height="64px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={toggleColorMode}
      zIndex={99}
    >
      {icon}
    </Button>
  );
};
