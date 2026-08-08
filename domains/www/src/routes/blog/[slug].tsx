import type { RouteProps } from "@solidjs/router";
import { defineFileRoute } from "@solidjs/router/fs";
import { httpStatus, Show } from "@solidjs/web";

import { type BlogPost, getBlogPost, PostContent } from "#/blog/posts";
import { Date } from "#/datetime";
import { H1 } from "#/page/hierarchy";
import { Root } from "#/page/layout/root";
import { Title } from "#/site/meta";
import { NotFound } from "#/site/not-found";

export const route = defineFileRoute("/blog/[slug]", {
  preload: ({ params }) => {
    const post = params.slug && getBlogPost(params.slug);
    return post ? post : httpStatus(404);
  },
});

function TitleizedHeader(props: { blog: BlogPost }) {
  return (
    <>
      <H1>{props.blog.title}</H1>
      <p class="text-center italic md:text-left md:text-lg">
        Published on <Date class="font-semibold">{props.blog.publishDate}</Date>.
        <Show when={props.blog.modifiedDate}>
          {(modifiedDate) => (
            <>
              {" "}
              Last updated on <Date class="font-semibold">{modifiedDate()}</Date>.
            </>
          )}
        </Show>
      </p>
    </>
  );
}

export default function SingleBlogPost(props: RouteProps<typeof route>) {
  return (
    <Show when={props.data || null} fallback={<NotFound />}>
      {(blog) => (
        <Root header={<TitleizedHeader blog={blog()} />}>
          <Title>{blog().title}</Title>
          <PostContent blog={blog()} />
        </Root>
      )}
    </Show>
  );
}
