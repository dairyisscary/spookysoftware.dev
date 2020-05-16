import React from "react";

function getFathomScriptTags() {
  return [
    <script
      key="fathom-remote-js"
      type="text/javascript"
      src="https://sheep.spookysoftware.dev/script.js"
      spa="auto"
      site="IAXGRDBV"
      defer
    />,
  ];
}

export const onRenderBody = ({ setPostBodyComponents }) => {
  if (process.env.NODE_ENV === "production") {
    return setPostBodyComponents(getFathomScriptTags());
  }
  return null;
};
