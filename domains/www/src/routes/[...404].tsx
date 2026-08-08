import type { RouteDefinition } from "@solidjs/router";
import { httpStatus } from "@solidjs/web";

import { H1 } from "#/page/hierarchy";
import { Root } from "#/page/layout/root";
import { Title } from "#/site/meta";

export const route: RouteDefinition = {
  preload: () => httpStatus(404),
};

export default function NotFound() {
  return (
    <Root header={<H1>404 — That means not found, homie</H1>}>
      <Title>Not Found</Title>
      <p>You just hit a route that doesn’t exist... Where did you get this link?</p>
    </Root>
  );
}
