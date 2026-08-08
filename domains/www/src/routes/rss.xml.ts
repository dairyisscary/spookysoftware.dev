import XMLBuilder from "fast-xml-builder";

import { getSortedBlogPosts } from "#/blog/posts";
import { SITE_DESCRIPTION } from "#/site/meta";
import { absoluteUrl, paths } from "#/site/navigation";

export function GET() {
  const root = {
    "?xml": { "@_version": "1.0", "@_encoding": "UTF-8" },
    rss: {
      "@_version": "2.0",
      channel: {
        title: "Spooky Software RSS Feed",
        description: SITE_DESCRIPTION,
        link: absoluteUrl(paths()),
        lastBuildDate: new Date().toUTCString(),
        item: getSortedBlogPosts().map((post) => {
          const link = absoluteUrl(paths.blog(post.slug));
          return {
            title: post.title,
            pubDate: post.publishDate.toUTCString(),
            link,
            guid: { "#text": link, "@_isPermaLink": "true" },
          };
        }),
      },
    },
  };

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    suppressEmptyNode: true,
    suppressBooleanAttributes: false,
  });

  return new Response(builder.build(root), {
    headers: { "Content-Type": "application/xml" },
  });
}
