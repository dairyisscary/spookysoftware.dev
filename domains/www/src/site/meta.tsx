import { Title as BaseTitle } from "@solidjs/meta";

export const SITE_DESCRIPTION = "Personal website and blog of Eric Kim-Butler";

export function Title(props: { children?: string }) {
  const prefix = () => (props.children ? `${props.children} | ` : "");
  return <BaseTitle>{`${prefix()}Spooky Software`}</BaseTitle>;
}
