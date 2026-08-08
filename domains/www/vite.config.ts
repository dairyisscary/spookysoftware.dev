import { resolve } from "node:path";

import solid from "@solidjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { fileRoutes } from "filesystem-routing/vite";
import { defineConfig } from "vite";

import markdown from "#vite/markdown";
import resumePdf from "#vite/resume-pdf";

export default defineConfig({
  envPrefix: "PUBLIC_",
  plugins: [
    solid({
      start: {
        app: resolve("./src/site/app.tsx"),
        document: resolve("./src/site/document.tsx"),
        middleware: resolve("./src/middleware.ts"),
      },
    }),
    fileRoutes({
      httpMethods: true,
      types: resolve("./src/site/virtual:file-routes.d.ts"),
    }),
    markdown(),
    tailwindcss(),
    resumePdf(),
  ],
  server: {
    port: 3030,
    strictPort: true,
    watch: {
      ignored: [`${resolve("./.direnv")}/**`],
    },
  },
});
