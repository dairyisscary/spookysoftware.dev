import { createSignal, onSettled } from "solid-js";

import { shuffle } from "#/array";

type State = { dir: "adding" | "removing"; index: number };

const TEXT = shuffle([
  "ever spooky is the software",
  "fuck ai",
  "you had me at echo",
  "warning: not a real terminal",
  "takes best served hot",
  "hx rant.md",
]);
const LONG_TIME = 3_000;
const SHORT_TIME = 50;

export function Terminal() {
  const [text, setText] = createSignal(TEXT[0]);

  onSettled(() => {
    function typingEffect() {
      const referenceText = TEXT[state.index];
      const currentText = text();
      const isRemoving = state.dir === "removing";
      let timing = SHORT_TIME;
      if (currentText && isRemoving) {
        setText(currentText.slice(0, currentText.length - 1));
      } else if (isRemoving) {
        state = { dir: "adding", index: (state.index + 1) % TEXT.length };
      } else if (referenceText.length === currentText.length) {
        state = { dir: "removing", index: state.index };
        timing = LONG_TIME;
      } else {
        setText(referenceText.slice(0, currentText.length + 1));
      }
      timeoutId = setTimeout(typingEffect, timing);
    }

    let state: State = { dir: "removing", index: 0 };
    let timeoutId = setTimeout(typingEffect, LONG_TIME);
    return () => clearTimeout(timeoutId);
  });

  return (
    <div
      class="overflow-auto rounded-xl bg-sps-bg-dark p-4 font-mono text-xl text-nowrap shadow-lg"
      aria-hidden="true"
    >
      <span class="text-sps-fg-dark">eric@spookysoftware.dev</span> on{" "}
      <span class="text-sps-accent-light">main</span> in{" "}
      <span class="text-sps-accent">blog-devshell</span>
      <br />
      <span class="text-sps-accent-dark">❯</span> {text()}
      <span class="pl-1 select-none motion-safe:animate-pulse" aria-hidden="true">
        █
      </span>
    </div>
  );
}
