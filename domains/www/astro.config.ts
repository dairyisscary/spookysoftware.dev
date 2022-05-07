import tailwindIntegration from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import { SITE_URL } from "./src/site/meta";
import minifyHTML from "./minify-html";

export default defineConfig({
  integrations: [
    minifyHTML(),
    tailwindIntegration({ config: { applyBaseStyles: false } }),
  ],
  markdown: {
    shikiConfig: { theme: "rose-pine" },
  },
  site: SITE_URL,
  trailingSlash: "always",
});
