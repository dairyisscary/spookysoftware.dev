import { resolve } from "node:path";

import solid from "@solidjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { fileRoutes } from "filesystem-routing/vite";
import { defineConfig } from "vite";

import markdown from "#vite/markdown";

export default defineConfig({
  plugins: [
    solid({
      start: {
        devtools: false,
        app: resolve("./src/app.tsx"),
        document: resolve("./src/document.tsx"),
      },
    }),
    fileRoutes({ types: resolve("./src/site/file-routes.d.ts") }),
    markdown(),
    tailwindcss(),
  ],
  server: {
    port: 3030,
    strictPort: true,
  },
});
