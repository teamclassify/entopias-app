import path from "path";
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
     plugins: [react(), tailwindcss()],
resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

    server: {
      port: parseInt(env.VITE_PORT),
      host: true,
      cors: true,
      allowedHosts: [`${VITE_FIREPLOY_HOST}`],
    },
    preview: {
      port: parseInt(env.VITE_PORT),
      host: true, // permite 0.0.0.0
      cors: true,
      allowedHosts: [`${VITE_FIREPLOY_HOST}`],
    },
  });
};