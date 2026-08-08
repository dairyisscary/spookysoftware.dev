import { pathToFileURL } from "node:url";

import { type Frontmatter, markdownToHtml } from "satteri";
import { parse } from "smol-toml";
import type { Plugin } from "vite";

const MD_RE = /\.md(?:\?|$)/;

function parseFrontmatter(frontmatter: Frontmatter | null): Record<string, unknown> {
  if (frontmatter?.kind !== "toml") {
    throw new Error(`Unsupported frontmatter type ${frontmatter?.kind}`);
  }
  return parse(frontmatter.value);
}

export default function markdown(): Plugin {
  return {
    name: "vite-plugin-sps-markdown",
    enforce: "pre",
    transform(source, id) {
      if (!MD_RE.test(id)) {
        return null;
      }

      const markdown = markdownToHtml(source, {
        fileURL: pathToFileURL(id.replace(/\?.*$/, "")),
      });

      const exports: [name: string, value: unknown][] = [
        ["html", markdown.html],
        ["frontmatter", parseFrontmatter(markdown.frontmatter)],
      ];

      const code = exports
        .map(([name, value]) => `export const ${name} = ${JSON.stringify(value)};`)
        .join("\n");

      return { code, map: null };
    },
  };
}
