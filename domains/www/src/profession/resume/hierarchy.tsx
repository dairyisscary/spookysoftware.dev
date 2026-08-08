import type { JSX } from "@solidjs/web";

export function H1(props: { class?: string; children: JSX.Element }) {
  return (
    <h1 class={["font-serif text-4xl text-sps-fg text-shadow-xs print:text-3xl", props.class]}>
      {props.children}
    </h1>
  );
}

export function H2(props: { class?: string; children: JSX.Element }) {
  return (
    <h2 class={["font-serif text-2xl text-sps-accent-light text-shadow-xs", props.class]}>
      {props.children}
    </h2>
  );
}
