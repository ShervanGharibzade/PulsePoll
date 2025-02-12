import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
/// <reference types="vite-plugin-svgr/client" />

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {},
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
