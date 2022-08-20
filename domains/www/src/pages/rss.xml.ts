import rss from "@astrojs/rss";

import { getSortedBlogPosts } from "@/blog/posts";
import { SITE_DESCRIPTION, SITE_NAME } from "@/site/meta";

export async function get() {
  const posts = await getSortedBlogPosts();
  const now = new Date();
  const lastBuildDate = `<lastBuildDate>${now.toISOString()}</lastBuildDate>`;
  return rss({
    title: `${SITE_NAME} RSS Feed`,
    description: SITE_DESCRIPTION,
    customData: lastBuildDate,
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      title: post.title,
      link: post.url,
      pubDate: post.publishDate,
    })),
  });
}
