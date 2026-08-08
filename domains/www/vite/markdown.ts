import { pathToFileURL } from "node:url";

import { type Frontmatter, markdownToHtml } from "satteri";
import { parse } from "smol-toml";
import type { Plugin } from "vite";

import { codeHighlighter } from "#vite/code-highlight";

const MD_RE = /\.md(?:\?|$)/;

function parseFrontmatter(frontmatter: Frontmatter | null): Record<string, unknown> {
  if (frontmatter?.kind !== "toml") {
    throw new Error(`Unsupported frontmatter type ${frontmatter?.kind}`);
  }
  return parse(frontmatter.value);
}

export default async function markdown(): Promise<Plugin> {
  const higlightPlugin = await codeHighlighter();
  return {
    name: "vite-plugin-sps-markdown",
    enforce: "pre",
    async transform(source, id) {
      if (!MD_RE.test(id)) {
        return null;
      }

      const markdown = await markdownToHtml(source, {
        hastPlugins: [higlightPlugin],
        features: { smartPunctuation: true },
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
