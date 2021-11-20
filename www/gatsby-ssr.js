import Favicon64 from "@/images/favicon-64.png";

const GOOGLE_FONT_HREF =
  "https://fonts.googleapis.com/css?family=Amatic+SC:700&text=Spooky+Software&display=swap";

function getFathomComponents() {
  return [
    <script
      key="fathom-remote-js"
      type="text/javascript"
      src="https://efficient-skilled.spookysoftware.dev/script.js"
      data-site="IAXGRDBV"
      defer
    />,
  ];
}

function getPostBodyComponents() {
  return [
    <script
      key="set-load-font"
      dangerouslySetInnerHTML={{
        __html: `var x=document.createElement("link");x.media="print";x.rel="stylesheet";x.onload=function(){x.onload=null;x.removeAttribute("media");document.body.classList.add("font-cursive-loaded");};x.href="${GOOGLE_FONT_HREF}";document.head.appendChild(x);`,
      }}
    />,
  ];
}

function getHeadComponents() {
  return [
    <link key="shortcut-icon" rel="shorcut icon" href={Favicon64} />,
    <link
      key="preconnect-google-font"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin=""
    />,
    <link
      key="preload-google-font"
      rel="preload"
      as="style"
      href={GOOGLE_FONT_HREF}
    />,
    <noscript key="noscript-google-font-fallback">
      <link rel="stylesheet" href={GOOGLE_FONT_HREF} />
      <style>{`.font-cursive{visibility:visible!important;}`}</style>
    </noscript>,
  ];
}

export const onRenderBody = (callbacks) => {
  callbacks.setHtmlAttributes({ lang: "en-US" });

  callbacks.setHeadComponents(getHeadComponents());

  const postBodyComponents = getPostBodyComponents().concat(
    process.env.NODE_ENV === "production" ? getFathomComponents() : [],
  );
  callbacks.setPostBodyComponents(postBodyComponents);
};
