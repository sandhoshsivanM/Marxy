import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ command }) => ({
  // GitHub Pages serves this project repo under /Marxy/; dev stays at root
  base: command === "build" ? "/Marxy/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["framer-motion", "gsap"],
        },
      },
    },
  },
}));
