import React from "react";

type Props = Omit<
  React.PropsWithoutRef<JSX.IntrinsicElements["a"]>,
  "rel" | "target"
>;

function NewTabLink(props: Props) {
  return <a {...props} rel="noopener noreferrer" target="_blank" />;
}

export default NewTabLink;
