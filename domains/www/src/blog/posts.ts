type Frontmatter = {
  title: string;
  publishDate: string;
  modifiedDate?: string;
};
type BlogModule = {
  html: string;
  frontmatter: Frontmatter;
};
type BlogPost = {
  title: string;
  slug: string;
  html: string;
  publishDate: Date;
  modifiedDate: Date | null;
};

const BLOG_MODULES = import.meta.glob<BlogModule>("./posts/*.md", { eager: true });

function sortPosts(a: BlogPost, b: BlogPost): number {
  return b.publishDate.valueOf() - a.publishDate.valueOf();
}

function getSlugFromModulePath(path: string): string {
  return path.match(/^\.\/posts\/(.+)\.md$/)![1];
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

export function getSortedBlogPosts(): BlogPost[] {
  return Object.entries(BLOG_MODULES)
    .map(([modulePath, blogModule]) => asBlogPost(blogModule, getSlugFromModulePath(modulePath)))
    .sort(sortPosts);
}

export function getBlogPost(slug: string): BlogPost {
  return asBlogPost(BLOG_MODULES[`./posts/${slug}.md`], slug);
}

export function getHTMLExcerpt(html: string): string | null {
  const excerptIndex = html.search(/({\/\*)?<!-- endexcerpt -->/);
  return excerptIndex > -1 ? html.slice(0, excerptIndex) : null;
}
