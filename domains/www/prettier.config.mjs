export default {
  proseWrap: "always",
  printWidth: 100,
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    { files: "*.md", options: { printWidth: 120 } },
    { files: "*.mdx", options: { printWidth: 120 } },
    { files: "*.astro", options: { parser: "astro" } },
  ],
};
