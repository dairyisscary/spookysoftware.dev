import { HydrationScript, type JSX } from "@solidjs/web";

import Favicon from "#/site/favicon.png?no-inline";
import { SITE_DESCRIPTION } from "#/site/meta";

export default function Document(props: { children: JSX.Element }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="version" content={import.meta.env.PUBLIC_PACKAGE_VERSION} />
        <link rel="shortcut icon" href={Favicon} />
        <title>Spooky Software</title>
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
