// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// // import eslint from "vite-plugin-eslint";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    open: true,
  },
});
