import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { LoginProvider } from "./auth/auth-provider";
import { ColorModeWidget } from "./common/color-mode-switch";
import { Router } from "./common/router";
import { Leva } from "leva";

const themeColors = {
  accent: "#6224dd",
  background: "#242424",
};

const theme = extendTheme({ themeColors });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <LoginProvider>
        <Router />
        <Leva />
      </LoginProvider>
      <ColorModeWidget />
    </ChakraProvider>
  </React.StrictMode>
);
