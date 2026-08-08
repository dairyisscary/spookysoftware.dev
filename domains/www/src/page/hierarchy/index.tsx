import type { JSX } from "@solidjs/web";

export function H1(props: { children: JSX.Element }) {
  return <h1 class="font-serif text-3xl md:text-4xl">{props.children}</h1>;
}
