import { H1 } from "#/page/hierarchy";
import { Root } from "#/page/layout/root";
import { Title } from "#/site/meta";

export function NotFound() {
  return (
    <Root
      header={
        <>
          <Title>Not Found</Title>
          <H1>404 — That means not found, homie</H1>
          <p class="text-xl">
            You just hit a route that doesn’t exist... Where did you get this link?
          </p>
        </>
      }
    />
  );
}
