import type { RouteDefinition } from "@solidjs/router";
import { httpStatus } from "@solidjs/web";

import { NotFound } from "#/site/not-found";

export const route: RouteDefinition = {
  preload: () => httpStatus(404),
};

export default function FourOhFour() {
  return <NotFound />;
}
