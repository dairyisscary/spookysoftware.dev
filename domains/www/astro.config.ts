import { defineConfig } from "astro/config";
import tailwindIntegration from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  compressHTML: true,
  integrations: [tailwindIntegration({ applyBaseStyles: false }), mdx()],
  markdown: {
    shikiConfig: { theme: "rose-pine" },
  },
  site: "https://www.spookysoftware.dev/",
  trailingSlash: "always",
});
