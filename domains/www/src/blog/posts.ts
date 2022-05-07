type Frontmatter = {
  title: string;
  publishDate: string;
  modifiedDate?: string;
};
type MarkdownModule = { metadata: { html: string } };
type WrappedBlogModule = {
  url: string;
  frontmatter: Frontmatter;
  default: () => Promise<MarkdownModule>;
};
type BlogModuleInfo = {
  wrappedModule: WrappedBlogModule;
  markdownModule: MarkdownModule;
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

async function getBlogs(): Promise<BlogModuleInfo[]> {
  const moduleMap = import.meta.glob<WrappedBlogModule>(
    "../pages/blog/*/index.md",
  );
  const postLoaders = Object.values(moduleMap).map(async (getModule) => {
    const wrappedModule = await getModule();
    return { wrappedModule, markdownModule: await wrappedModule.default() };
  });
  return Promise.all(postLoaders);
}

export async function getSortedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getBlogs();
  return posts
    .map(({ wrappedModule, markdownModule }) => {
      const { url, frontmatter } = wrappedModule;
      const { html } = markdownModule.metadata;
      return {
        title: frontmatter.title,
        url,
        html,
        publishDate: new Date(frontmatter.publishDate),
        modifiedDate: frontmatter.modifiedDate
          ? new Date(frontmatter.modifiedDate)
          : null,
      };
    })
    .sort(sortPosts);
}
