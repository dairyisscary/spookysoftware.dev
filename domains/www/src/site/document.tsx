import { HydrationScript, type JSX } from "@solidjs/web";

import Favicon from "#/site/favicon.png?no-inline";
import { SITE_DESCRIPTION } from "#/site/meta";
import SourceSerif from "@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-normal.woff2?no-inline";
import { RSS_XML_PATH } from "#/site/navigation";

export default function Document(props: { children: JSX.Element }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Spooky Software</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="version" content={import.meta.env.PUBLIC_PACKAGE_VERSION || "dev"} />
        <link rel="icon" href={Favicon} />
        <link rel="preload" as="font" type="font/woff2" crossorigin href={SourceSerif} />
        <link rel="alternate" type="application/rss+xml" title="RSS feed of Spooky Software posts" href={RSS_XML_PATH} />
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
