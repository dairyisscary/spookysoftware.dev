import type { Element } from "hast";
import type { HastNode, HastPluginDefinition } from "satteri";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

const CODE_HIGHLIGHT_THEME = {
  name: "sps",
  bg: spsColor(900),
  fg: spsColor(100),
  settings: [
    { scope: "comment", settings: { foreground: spsColor(500) } },
    { scope: "constant", settings: { foreground: spsColor(300) } },
    { scope: "keyword", settings: { foreground: spsColor(400) } },
    { scope: "string", settings: { foreground: spsColor(300) } },
  ],
};

function spsColor(weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900): string {
  return `var(--sps-${weight})`;
}

function assertHastNodeIs(node: HastNode, tagName: string): asserts node is Element {
  if (node.type !== "element") {
    throw new Error(`Unsupported type in code highlight: ${node.type}`);
  }
  if (node.tagName !== tagName) {
    throw new Error(`Unsupported tag name in code highlight: ${node.tagName}, wanted ${tagName}`);
  }
}

function guardHastNodeIs(node: HastNode, tagName: string): node is Element {
  return node.type === "element" && node.tagName === tagName;
}

export async function codeHighlighter(): Promise<HastPluginDefinition> {
  const { codeToHast } = await createHighlighterCore({
    engine: createOnigurumaEngine(import("shiki/wasm")),
    themes: [CODE_HIGHLIGHT_THEME],
    langs: [
      import("@shikijs/langs/elixir"),
      import("@shikijs/langs/python"),
      import("@shikijs/langs/rust"),
      import("@shikijs/langs/typescript"),
      import("@shikijs/langs/zig"),
    ],
  });

  return {
    name: "sps-code-highlight",
    element: {
      filter: ["pre"],
      visit(preElement) {
        assertHastNodeIs(preElement, "pre");

        const [codeElement] = preElement.children;
        if (preElement.children.length !== 1 || !guardHastNodeIs(codeElement, "code")) {
          return;
        }

        const lang = (codeElement.data as { lang?: string } | null)?.lang;
        const [codeText] = codeElement.children;
        if (!lang || codeElement.children.length !== 1 || codeText?.type !== "text") {
          return;
        }

        const rendered = codeToHast(codeText.value, {
          lang,
          theme: "sps",
        });

        const renderedPreElement = rendered.children[0];
        assertHastNodeIs(renderedPreElement, "pre");
        delete renderedPreElement.properties.class; // useless class
        return renderedPreElement;
      },
    },
  };
}
