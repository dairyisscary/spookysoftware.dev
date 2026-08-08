import type { JSX } from "@solidjs/web";
import { For } from "solid-js";

import { paths } from "#/router";
import Favicon from "#/site/favicon.png";

const HEADER_Y_PADDING_CX = "py-6";
const MAIN_LINK_COLORS = ["text-sps-bg", "text-sps-accent-dark", "text-sps-accent-light"];

function MainLink(props: { hidden?: boolean }) {
  return (
    <a
      href={paths()}
      tabindex={props.hidden ? -1 : undefined}
      class={[
        "group flex items-end gap-4",
        "font-sps-serif text-3xl font-semibold no-underline md:text-4xl",
        props.hidden && "relative left-[-1000000px] select-none",
      ]}
    >
      <img alt="" class="size-[32px]" src={Favicon} />
      <span class="relative">
        <For each={MAIN_LINK_COLORS}>
          {(color, index) => (
            <span
              aria-hidden="true"
              class={[
                "absolute inset-0 -z-1 opacity-0 ease-linear motion-safe:transition-[translate,opacity]",
                "group-focus-within:translate-y-(--header-translate) group-focus-within:opacity-100",
                "group-hover:translate-y-(--header-translate) group-hover:opacity-100",
                color,
              ]}
              style={{
                scale: 1 - 0.05 * (MAIN_LINK_COLORS.length - index()),
                "--header-translate": `${-7 * (MAIN_LINK_COLORS.length - index())}px`,
              }}
            >
              Spooky Software
            </span>
          )}
        </For>
        Spooky Software
      </span>
    </a>
  );
}

/** Content with the same height as the "main nav" without content */
export function HiddenMainNavContainer(props: { children?: JSX.Element; class?: string }) {
  return (
    <div
      aria-hidden="true"
      class={[HEADER_Y_PADDING_CX, "sticky inset-x-0 top-0 overflow-hidden", props.class]}
    >
      {props.children}
      <MainLink hidden />
    </div>
  );
}

export function Header() {
  return (
    <div class="sticky inset-x-0 top-0 z-1">
      <header class={["main-contain flex items-center justify-between gap-4", HEADER_Y_PADDING_CX]}>
        <MainLink />
        <nav class="text-lg" aria-label="Main Site Links">
          <a href={paths.about()}>About</a>
        </nav>
      </header>
    </div>
  );
}
