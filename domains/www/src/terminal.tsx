import { createMemo, createSignal, onSettled, untrack } from "solid-js";

import { shuffle } from "#/array";

type TypingEffectState = Readonly<{ dir: "adding" | "removing"; index: number }>;

const CATALOG = [
  "ever spooky is the software",
  "you had me at echo",
  "warning: not a real terminal",
  "takes best served hot",
  "hx rant.md",
] as const;
const LONG_TIME = 3000;
const SHORT_TIME = 50;

export function Terminal() {
  let state: TypingEffectState = { dir: "removing", index: 0 };
  const shuffled = createMemo(() => shuffle(CATALOG));
  const untrackedCurrent = () => untrack(shuffled);
  const [text, setText] = createSignal<string>(untrackedCurrent()[0]);

  onSettled(() => {
    function typingEffect() {
      const current = untrackedCurrent();
      const referenceText = current[state.index];
      const currentText = text();
      const isRemoving = state.dir === "removing";
      let timing = SHORT_TIME;
      if (currentText && isRemoving) {
        setText(currentText.slice(0, currentText.length - 1));
      } else if (isRemoving) {
        state = { dir: "adding", index: (state.index + 1) % current.length };
      } else if (referenceText.length === currentText.length) {
        state = { dir: "removing", index: state.index };
        timing = LONG_TIME;
      } else {
        setText(referenceText.slice(0, currentText.length + 1));
      }
      timeoutId = setTimeout(typingEffect, timing);
    }

    let timeoutId = setTimeout(typingEffect, LONG_TIME);
    return () => clearTimeout(timeoutId);
  });

  return (
    <div
      class="sps-code bg-sps-bg-dark p-4 shadow-lg corner-squircle md:px-6 md:py-4 md:text-lg"
      aria-hidden="true"
    >
      <span class="text-sps-fg-dark">eric@spookysoftware.dev</span> on{" "}
      <span class="text-sps-accent-light">main</span> in{" "}
      <span class="text-sps-accent">blog-devshell</span>
      <br />
      <span class="text-sps-accent-dark">❯</span>{" "}
      <span
        ref={({ textContent }) => {
          // Because SSR might shuffle the CATALOG differently, we must "sync" with it on init
          const index = (untrackedCurrent() as string[]).indexOf(textContent);
          if (index >= 0) {
            state = { ...state, index };
            setText(textContent);
          }
        }}
      >
        {text()}
      </span>
      <span class="pl-1 select-none motion-safe:animate-pulse" aria-hidden="true">
        █
      </span>
    </div>
  );
}
