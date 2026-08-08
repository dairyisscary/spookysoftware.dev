import type { JSX } from "@solidjs/web";

import { Footer } from "#/page/hierarchy/footer";
import { Header, HiddenMainNavContainer } from "#/page/hierarchy/header";
import { Terrain } from "#/terrain";

const MAIN_ID = "spooky-software-main-id";

function Rainbow(props: { class?: string }) {
  return <div class={["sps-rainbow absolute inset-x-0 h-3", props.class]} />;
}

export function Root(props: { children: JSX.Element; header: JSX.Element }) {
  return (
    <>
      <a
        class="fixed top-0 left-1/2 z-1 -translate-x-1/2 -translate-y-full rounded bg-sps-bg-dark p-2 opacity-0 ease-in focus:translate-y-0 focus:opacity-100 motion-safe:transition"
        href={`#${MAIN_ID}`}
      >
        Skip to content
      </a>

      <div class="isolate flex min-h-dvh flex-col">
        <Header />

        <div class="isolate">
          <HiddenMainNavContainer class="bg-linear-to-b from-sps-bg to-sps-bg/80 backdrop-blur-[3px]" />
          <div class="main-contain pb-12">{props.header}</div>
          <Terrain class="relative z-1" height={200} width={1_400} />
        </div>

        <div class="flex flex-1 flex-col bg-sps-bg-dark shadow-lg" id={MAIN_ID}>
          <HiddenMainNavContainer class="bg-sps-bg-dark">
            <Rainbow class="top-0" />
          </HiddenMainNavContainer>

          <main class="main-contain">{props.children}</main>

          <HiddenMainNavContainer class="mt-auto">
            <Rainbow class="bottom-0" />
          </HiddenMainNavContainer>
        </div>

        <Footer />
      </div>
    </>
  );
}
