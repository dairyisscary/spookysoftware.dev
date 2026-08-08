import { Title as BaseTitle } from "@solidjs/meta";

export const SITE_DESCRIPTION = "Personal website and blog of Eric Kim-Butler";

const CONTACT_EMAIL_PARTS = ["spooky-contact", ".", "goldmine410", "@", "passmail.net"] as const;

export function encodedEmail(withMailTo?: boolean): string {
  const parts = withMailTo ? ["mailto:"].concat(CONTACT_EMAIL_PARTS) : CONTACT_EMAIL_PARTS;
  return parts.flatMap((part) => part.split("").map((c) => `&#${c.charCodeAt(0)};`)).join("");
}

export function Title(props: { children?: string }) {
  const prefix = () => (props.children ? `${props.children} | ` : "");
  return <BaseTitle>{`${prefix()}Spooky Software`}</BaseTitle>;
}
