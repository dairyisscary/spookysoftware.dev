import { createRouter, type PathEnd } from "@solidjs/router";
import { fileRoutes } from "@solidjs/router/fs";
import { pageRoutes } from "virtual:file-routes";

export const Router = createRouter({ routes: fileRoutes(pageRoutes) });

export const THIS_SITES_REPO_URL = "https://github.com/dairyisscary/spookysoftware.dev";

export const { paths } = Router;

export function absoluteUrl(path: string | PathEnd): string {
  return `https://www.spookysoftware.dev${path.toString()}`;
}
