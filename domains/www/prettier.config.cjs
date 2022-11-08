module.exports = {
  trailingComma: "all",
  proseWrap: "always",
  printWidth: 100,
  overrides: [
    { files: "*.md", options: { printWidth: 120 } },
    { files: "*.mdx", options: { printWidth: 120 } },
  ],
};
