import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    plugins: [react()],
    server: {
      port: 8080,
    },
    envPrefix: "REACT_APP_",
    build: {
      sourcemap: true,
    },
    define: {},
  };

  if (mode === "development") {
    config.define = {
      global: "globalThis",
    };
  }

  return config;
});
