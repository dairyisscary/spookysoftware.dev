// TODO preload? import SourceSerif from "@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-normal.woff2?url";
import { HydrationScript, type JSX } from "@solidjs/web";

import Favicon from "#/site/favicon.png";
import { SITE_DESCRIPTION } from "#/site/meta";

export default function Document(props: { children: JSX.Element }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="shortcut icon" href={Favicon} />
        <title>Spooky Software</title>
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
