import type { JSX } from "@solidjs/web";
import { createUniqueId, For } from "solid-js";

import Favicon from "#/site/favicon.png";
import { paths } from "#/site/navigation";

const HEADER_Y_PADDING_CX = "py-6";
const MAIN_LINK_COLORS = ["text-sps-bg", "text-sps-accent-dark", "text-sps-accent-light"] as const;

function MainLink(
  props: { filterId: string; hidden?: false } | { hidden: true; filterId?: never },
) {
  return (
    <a
      href={paths()}
      tabindex={props.hidden ? -1 : undefined}
      class={[
        "group",
        "font-sps-serif text-3xl font-semibold no-underline md:text-4xl",
        props.hidden && "relative left-[-1000000px] select-none",
      ]}
    >
      <span
        class={[
          "flex items-end gap-2",
          !props.hidden &&
            "motion-safe:group-hover:filter-(--spooky-filter) motion-safe:group-focus:filter-(--spooky-filter)",
        ]}
        style={{ "--spooky-filter": props.hidden ? undefined : `url(#${props.filterId})` }}
      >
        <img alt="" class="size-[32px]" src={Favicon} />
        <span class="relative">
          <For each={MAIN_LINK_COLORS}>
            {(color, index) => (
              <span
                aria-hidden="true"
                class={[
                  "absolute inset-0 -z-1 opacity-0 ease-linear motion-safe:transition-[translate,opacity]",
                  "group-focus:translate-y-(--header-translate) group-focus:opacity-100",
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
          <span class="text-sps-fg-light text-shadow-md">Spooky Software</span>
        </span>
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

function SpookyFilter(props: { id: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="sr-only">
      <defs>
        <filter id={props.id} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0 0.2" result="NOISE" numOctaves="1">
            <animate
              attributeName="baseFrequency"
              values="0 0.15;0 0.25;0 0.15"
              dur="3s"
              begin="0s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="NOISE"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="R"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function Header() {
  const spookyFilterId = createUniqueId();
  return (
    <div class="fixed inset-x-0 top-0 z-1">
      <header
        class={["sps-main-contain flex items-center justify-between gap-4", HEADER_Y_PADDING_CX]}
      >
        <SpookyFilter id={spookyFilterId} />
        <MainLink filterId={spookyFilterId} />
        <nav class="text-lg" aria-label="Main Site Links">
          <a href={paths.about()}>About</a>
        </nav>
      </header>
    </div>
  );
}
