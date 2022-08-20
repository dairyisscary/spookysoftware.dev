type Frontmatter = {
  title: string;
  publishDate: string;
  modifiedDate?: string;
};
type BlogModule = {
  url: string;
  compiledContent: () => string;
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
  const posts = await getBlogs();
  return posts
    .map((blogModule) => {
      const { url, frontmatter, compiledContent } = blogModule;
      return {
        title: frontmatter.title,
        url,
        html: compiledContent(),
        publishDate: new Date(frontmatter.publishDate),
        modifiedDate: frontmatter.modifiedDate
          ? new Date(frontmatter.modifiedDate)
          : null,
      };
    })
    .sort(sortPosts);
}

export function getHTMLExcerpt(html: string): string | null {
  const excerptIndex = html.search(/({\/\*)?<!-- endexcerpt -->/);
  return excerptIndex > -1 ? html.slice(0, excerptIndex) : null;
}
