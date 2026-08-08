import type { ComponentProps } from "@solidjs/web";

export function NewTabLink(props: Omit<ComponentProps<"a">, "target">) {
  return <a {...props} rel="noopener noreferrer" target="_blank" />;
}
