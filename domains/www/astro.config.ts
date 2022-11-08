import { defineConfig } from "astro/config";
import tailwindIntegration from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import minifyHTML from "./minify-html";

export default defineConfig({
  integrations: [minifyHTML(), tailwindIntegration({ config: { applyBaseStyles: false } }), mdx()],
  markdown: {
    shikiConfig: { theme: "rose-pine" },
  },
  site: "https://www.spookysoftware.dev/",
  trailingSlash: "always",
});
