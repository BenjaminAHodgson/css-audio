import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/core/index.ts",
      name: "css-audio",
    },
  },
});
