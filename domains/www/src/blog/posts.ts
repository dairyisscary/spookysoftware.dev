type Frontmatter = {
  title: string;
  publishDate: string;
  modifiedDate?: string;
};
type BlogModule = {
  url: string;
  compiledContent: () => Promise<string>;
  frontmatter: Frontmatter;
};
type BlogPost = {
  title: string;
  url: string;
  html: string;
  publishDate: Date;
  modifiedDate: Date | null;
};

function sortPosts(a: BlogPost, b: BlogPost): number {
  return b.publishDate.valueOf() - a.publishDate.valueOf();
}

async function getBlogs(): Promise<BlogModule[]> {
  const moduleMap = import.meta.glob<BlogModule>("../pages/blog/*/index.md");
  const postLoaders = Object.values(moduleMap).map((getModule) => getModule());
  return Promise.all(postLoaders);
}

export async function getSortedBlogPosts(): Promise<BlogPost[]> {
  const blogModules = await getBlogs();
  const blogMoudlesWithContent = await Promise.all(
    blogModules.map(async (blogModule) => ({
      html: await blogModule.compiledContent(),
      blogModule,
    })),
  );
  return blogMoudlesWithContent
    .map(({ html, blogModule: { url, frontmatter } }) => ({
      title: frontmatter.title,
      url,
      html,
      publishDate: new Date(frontmatter.publishDate),
      modifiedDate: frontmatter.modifiedDate ? new Date(frontmatter.modifiedDate) : null,
    }))
    .sort(sortPosts);
}

export function getHTMLExcerpt(html: string): string | null {
  const excerptIndex = html.search(/({\/\*)?<!-- endexcerpt -->/);
  return excerptIndex > -1 ? html.slice(0, excerptIndex) : null;
}
