import type { AstroIntegration } from "astro";
import { minify } from "html-minifier-terser";
import { join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";

const MINIFY_OPTIONS = {
  collapseWhitespace: true,
  minifyJS: true,
  removeComments: true,
};

async function minifyHtmlFilePath(filePath: string): Promise<unknown> {
  const originalContents = await readFile(filePath, "utf-8");
  const minifiedContents = await minify(originalContents, MINIFY_OPTIONS);
  return writeFile(filePath, minifiedContents);
}

export default function createMinifyHTMLPlugin(): AstroIntegration {
  return {
    name: "minifyhtml",
    hooks: {
      "astro:build:done": async ({ routes, dir }) => {
        const { pathname: dirPathName } = dir;
        const htmlFilePaths = routes.flatMap(({ component, pathname }) => {
          if (!pathname) {
            throw new Error(`Missing pathname for component ${component}`);
          } else if (pathname.endsWith(".xml")) {
            return [];
          } else if (pathname === "/404") {
            return [join(dirPathName, "404.html")];
          }
          return [join(dirPathName, pathname, "index.html")];
        });
        await Promise.all(htmlFilePaths.map(minifyHtmlFilePath));
      },
    },
  };
}
