import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Canvas } from "@react-three/fiber";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Canvas
      gl={{ antialias: false, stencil: false }}
      camera={{ position: [2, 0, 0], fov: 60 }}
    >
      <App />
    </Canvas>
  </React.StrictMode>
);
