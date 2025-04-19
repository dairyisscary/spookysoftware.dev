import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [mdx()],

  markdown: {
    shikiConfig: { theme: "rose-pine" },
  },

  site: "https://www.spookysoftware.dev/",
  trailingSlash: "always",

  vite: {
    plugins: [tailwindcss()],
  },
});
