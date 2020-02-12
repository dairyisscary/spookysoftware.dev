import React from "react";

function getFathomScriptTags() {
  const fathomInlineContent = `
    (function(f,a,t,h){
      a[h]=a[h]||function(){
        (a[h].q=a[h].q||[]).push(arguments)
      };
    })(document,window,null,"fathom");
    fathom("set", "siteId", "IAXGRDBV");
    if (window.location.hostname === "www.spookysoftware.dev")
      fathom("trackPageview");
  `;
  return [
    <script
      key="fathom-inline-js"
      type="text/javascript"
      dangerouslySetInnerHTML={{ __html: fathomInlineContent }}
    />,
    <script
      key="fathom-remote-js"
      type="text/javascript"
      async
      src="https://cdn.usefathom.com/tracker.js"
      id="fathom-script"
    />,
  ];
}

export const onRenderBody = ({ setPostBodyComponents }) => {
  if (process.env.NODE_ENV === "production") {
    return setPostBodyComponents(getFathomScriptTags());
  }
  return null;
};
