import { createRouter, type PathEnd } from "@solidjs/router";
import { fileRoutes } from "@solidjs/router/fs";
import type { ComponentProps } from "@solidjs/web";
import { pageRoutes } from "virtual:file-routes";

export function NewTabLink(props: Omit<ComponentProps<"a">, "target" | "rel">) {
  return <a {...props} rel="noopener noreferrer" target="_blank" />;
}

// TODO this || []?
export const Router = createRouter({ routes: fileRoutes(pageRoutes || []) });

export const THIS_SITES_REPO_URL = "https://github.com/dairyisscary/spookysoftware.dev";

export const { paths } = Router;

export function absoluteUrl(path: string | PathEnd): string {
  return `https://www.spookysoftware.dev${path.toString()}`;
}
