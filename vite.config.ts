import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Unfonts from "unplugin-fonts/vite";
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@components": path.resolve(__dirname, "./src/components"),
          "@assets": path.resolve(__dirname, "./src/assets"),
          "@styles": path.resolve(__dirname, "./src/styles"),
        },
      },
  plugins: [
    react(),
    Unfonts({
      custom: {
        families: [
          {
            name: "Baloo", // The font family name to use in CSS
            local: "Baloo",
            src: "./src/assets/fonts/Baloo-Regular.woff2",
            transform: (font) => {
              font.style = "normal";
              font.weight = 400;
              return font;
            },
          },
          {
            name: "Baloo2", // The variable font family name to use in CSS
            local: "Baloo2",
            src: "./src/assets/fonts/Baloo2-Variable.woff2",
          },
        ],
        display: "swap", // Control how the font is displayed while loading
        preload: true, // Preload the fonts to improve performance
        injectTo: "head-prepend", // Inject the font-face rules in the head of the document
      },
    }),
  ],
});
