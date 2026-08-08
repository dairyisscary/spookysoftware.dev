import type { RouteProps } from "@solidjs/router";
import { defineFileRoute } from "@solidjs/router/fs";
import { httpStatus } from "@solidjs/web";

import { getBlogPost } from "#/blog/posts";
import { H1 } from "#/page/hierarchy";
import { Root } from "#/page/layout/root";
import { Title } from "#/site/meta";

export const route = defineFileRoute("/blog/[slug]", {
  preload: ({ params }) => {
    const post = params.slug && getBlogPost(params.slug);
  },
});

export default function BlogPost(props: RouteProps<typeof route>) {
  return (
    <Root header={<H1>{props.data.title}</H1>}>
    </Root>
  );
}
