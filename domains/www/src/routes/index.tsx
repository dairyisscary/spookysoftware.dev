import { For } from "solid-js";

import { PostListingTitle, PostExcerptContent } from "#/blog/posts";
import { getSortedBlogPosts } from "#/blog/posts";
import { Date } from "#/datetime";
import { Root } from "#/page/layout/root";
import { Terminal } from "#/terminal";

export default function Home() {
  return (
    <Root header={<Terminal />}>
      <div class="my-1 space-y-24">
        <For each={getSortedBlogPosts()}>
          {(blog) => (
            <article class="space-y-8">
              <header class="space-y-2">
                <PostListingTitle blog={blog} />
                <Date class="font-semibold italic">{blog.publishDate}</Date>
              </header>
              <PostExcerptContent blog={blog} />
            </article>
          )}
        </For>
      </div>
    </Root>
  );
}
