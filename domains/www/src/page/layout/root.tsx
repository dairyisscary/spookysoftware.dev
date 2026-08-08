import type { JSX } from "@solidjs/web";
import { Show } from "solid-js";

import { Footer } from "#/page/hierarchy/footer";
import { Header, HiddenMainNavContainer } from "#/page/hierarchy/header";
import { Terrain } from "#/terrain";

const MAIN_ID = "sps-main-id";

function Rainbow(props: { class?: string }) {
  return <div class={["sps-rainbow absolute inset-x-0 h-2", props.class]} />;
}

export function Root(props: { children?: JSX.Element; header: JSX.Element }) {
  return (
    <>
      <a
        class={[
          "fixed top-0 left-1/2 z-1 -translate-x-1/2 -translate-y-full",
          "rounded bg-sps-bg-dark p-2 opacity-0 ease-in",
          "focus:translate-y-0 focus:opacity-100 motion-safe:transition",
        ]}
        href={`#${MAIN_ID}`}
      >
        Skip to content
      </a>

      <div class="isolate flex min-h-dvh flex-col">
        <Header />

        <div class="isolate">
          <HiddenMainNavContainer class="z-1 bg-linear-to-b from-sps-bg to-sps-bg/80 backdrop-blur-[3px]" />
          <div class="sps-main-contain space-y-2 py-12 md:space-y-4">{props.header}</div>
          <Terrain class="relative z-2" height={200} width={1400} />
        </div>

        <div
          id={MAIN_ID}
          class={["flex flex-1 flex-col", props.children && "bg-sps-bg-dark shadow-lg"]}
        >
          <Show when={props.children} fallback={<Rainbow />}>
            {(children) => (
              <>
                <HiddenMainNavContainer class="bg-sps-bg-dark">
                  <Rainbow class="top-0" />
                </HiddenMainNavContainer>

                <main class="sps-main-contain">{children()}</main>

                <HiddenMainNavContainer class="mt-auto">
                  <Rainbow class="bottom-0" />
                </HiddenMainNavContainer>
              </>
            )}
          </Show>
        </div>

        <Footer />
      </div>
    </>
  );
}
