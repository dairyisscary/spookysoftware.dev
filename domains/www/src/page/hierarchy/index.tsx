import type { JSX } from "@solidjs/web";

export function H1(props: { children: JSX.Element }) {
  return (
    <h1 class="text-center font-serif text-3xl text-sps-fg text-shadow-sm md:text-left md:text-4xl">
      {props.children}
    </h1>
  );
}
