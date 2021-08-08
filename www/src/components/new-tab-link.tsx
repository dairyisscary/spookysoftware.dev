import type { ComponentPropsWithoutRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"a">, "rel" | "target">;

function NewTabLink(props: Props) {
  return <a {...props} rel="noopener noreferrer" target="_blank" />;
}

export default NewTabLink;
