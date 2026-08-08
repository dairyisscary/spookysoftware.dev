import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join, extname } from "node:path";

import { parse, SyntaxKind, walk } from "html5parser";

type Routes = Map<string, Uint8Array<ArrayBuffer>>;

const ALLOWED_CONTENT_TYPES = new Set<string | undefined>(["text/html", "application/xml"]);
const INTIAL_PATHS_AND_CODES = new Map([
  ["/", undefined],
  ["/404", 404],
]);

function isDenyListPathname(pathname: string): boolean {
  // The nasty formed mailto: link
  return pathname === "/&" || pathname.startsWith("mailto:");
}

function isAllowedContentTypeHeader(contentTypeHeader: string | null): boolean {
  const contentType = contentTypeHeader?.split(";")?.[0];
  return ALLOWED_CONTENT_TYPES.has(contentType);
}

async function crawlPage(url: URL, results: Routes) {
  const { pathname, origin } = url;

  if (results.has(pathname)) {
    return;
  }
  if (isDenyListPathname(pathname)) {
    return;
  }

  const response = await fetch(url);
  const deniedContentType = !isAllowedContentTypeHeader(response.headers.get("content-type"));
  if (deniedContentType) {
    return;
  }

  const allowedResponse = INTIAL_PATHS_AND_CODES.get(pathname);
  if (allowedResponse && response.status !== allowedResponse) {
    throw new Error(`Bad response ${url}: expected ${allowedResponse}, got ${response.status}`);
  }
  if (!allowedResponse && !response.ok) {
    throw new Error(`Bad response ${url}: ${response.status}`);
  }

  const bytes = await response.bytes();
  results.set(pathname, bytes);

  const ast = parse(Buffer.from(bytes).toString("utf8"));

  const foundUrls: URL[] = [];
  walk(ast, {
    enter(node) {
      if (node.type !== SyntaxKind.Tag || node.name !== "a") {
        return;
      }
      const href = node.attributes.find((attr) => attr.name.value === "href")?.value?.value;
      if (href) {
        const newUrl = new URL(href, origin);
        foundUrls.push(newUrl);
      }
    },
  });

  for (const foundUrl of foundUrls) {
    // Keep it all on the same origin
    if (foundUrl.origin === origin) {
      await crawlPage(foundUrl, results);
    }
  }
}

async function gatherRoutes(baseUrl: string): Promise<Routes> {
  const results = new Map();
  for (const path of INTIAL_PATHS_AND_CODES.keys()) {
    await crawlPage(new URL(path, baseUrl), results);
  }
  return results;
}

async function writeOutRoutes(routes: Routes, outDir: string) {
  for (const [pathname, bytes] of routes.entries()) {
    const middleDirs = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
    let relativeFilePath = "index.html";
    if (middleDirs && extname(middleDirs)) {
      relativeFilePath = middleDirs;
    } else if (middleDirs) {
      relativeFilePath = `${middleDirs}.html`;
    }
    const fullPath = join(outDir, relativeFilePath);
    await mkdir(dirname(fullPath), { recursive: true });
    await writeFile(fullPath, bytes, "utf8");
  }
}

async function main() {
  const { BASE_SERVER_URL, OUT_DIR } = process.env;
  if (!BASE_SERVER_URL || !OUT_DIR) {
    throw new Error(
      `Missing required env vars, server url: ${BASE_SERVER_URL}, out html dir: ${OUT_DIR}`,
    );
  }

  try {
    const routes = await gatherRoutes(BASE_SERVER_URL);
    await writeOutRoutes(routes, OUT_DIR);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
