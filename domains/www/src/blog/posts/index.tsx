import { createMemo, Show } from "solid-js";

import { paths } from "#/site/navigation";

type Frontmatter = {
  title: string;
  publishDate: string;
  modifiedDate?: string;
};
type BlogModule = {
  html: string;
  frontmatter: Frontmatter;
};
export type BlogPost = {
  title: string;
  slug: string;
  html: string;
  publishDate: Date;
  modifiedDate: Date | null;
};

const BLOG_MODULES = import.meta.glob<BlogModule>("./*.md", { eager: true });

const EXCERPT_COMMENT = "<!-- endexcerpt -->";
const READ_MORE_EXCERPT_MARKER_ID = "sps-read-more";
const READ_MORE_MARKER = `<div class="sr-only scroll-mt-25" id="${READ_MORE_EXCERPT_MARKER_ID}"></div>`;

function sortPosts(a: BlogPost, b: BlogPost): number {
  return b.publishDate.valueOf() - a.publishDate.valueOf();
}

function getSlugFromModulePath(path: string): string {
  const [, slug] = path.match(/^\.\/(.+)\.md$/)!;
  return slug;
}

function asBlogPost({ html, frontmatter }: BlogModule, slug: string): BlogPost {
  return {
    title: frontmatter.title,
    slug,
    html,
    publishDate: new Date(frontmatter.publishDate),
    modifiedDate: frontmatter.modifiedDate ? new Date(frontmatter.modifiedDate) : null,
  };
}

/** Get all posts, sorted by publishDate */
export function getSortedBlogPosts(): BlogPost[] {
  return Object.entries(BLOG_MODULES)
    .map(([modulePath, blogModule]) => asBlogPost(blogModule, getSlugFromModulePath(modulePath)))
    .sort(sortPosts);
}

/** Get single blog post by its slug */
export function getBlogPost(slug: string): BlogPost | null {
  const blogModule = BLOG_MODULES[`./${slug}.md`];
  return blogModule ? asBlogPost(blogModule, slug) : null;
}

function Content(props: { innerHTML: string }) {
  return <div class="sps-prose" innerHTML={props.innerHTML} />;
}

function addExcerptMarker(html: string) {
  return html.replace(EXCERPT_COMMENT, READ_MORE_MARKER);
}

/** Styled and contained blog HTML */
export function PostContent(props: { blog: BlogPost }) {
  return <Content innerHTML={addExcerptMarker(props.blog.html)} />;
}

export function PostExcerptContent(props: { blog: BlogPost }) {
  const excerptIndex = createMemo(() => {
    const excerptIndex = props.blog.html.indexOf(EXCERPT_COMMENT);
    return excerptIndex > 100 ? excerptIndex : 0;
  });
  return (
    <Show when={excerptIndex()} fallback={<PostContent blog={props.blog} />}>
      {(index) => (
        <>
          <Content innerHTML={props.blog.html.slice(0, index())} />
          <a
            class="text-sps-accent"
            href={paths.blog(props.blog.slug, {}, READ_MORE_EXCERPT_MARKER_ID)}
          >
            Read more…
          </a>
        </>
      )}
    </Show>
  );
}

export function PostListingTitle(props: { blog: BlogPost }) {
  return (
    <h1>
      {/* TODO trailing */}
      <a
        class="font-serif text-2xl decoration-2 underline-offset-4 text-shadow-md md:text-3xl"
        href={paths.blog(props.blog.slug)}
      >
        {props.blog.title}
      </a>
    </h1>
  );
}
