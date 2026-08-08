import { For } from "solid-js";

import { getSortedBlogPosts } from "#/blog/posts";
import { Root } from "#/page/layout/root";
import { paths } from "#/router";
import { Title } from "#/site/meta";
import { Terminal } from "#/terminal";

export default function Home() {
  return (
    <Root header={<Terminal />}>
      <Title>Home</Title>
      <For each={getSortedBlogPosts()}>
        {(blog) => (
          <article>
          </article>
        )}
      </For>
    </Root>
  );
}
