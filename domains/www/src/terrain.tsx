import { createMemo, For } from "solid-js";

const SMOOTHNESS = 0.216666666666;
const COMPLEXITY = 9;
const AMPLITUDE = 60;
const LAYERS = [
  "fill-sps-bg-dark",
  "fill-sps-bg-light",
  "fill-sps-accent-dark",
  "fill-sps-accent",
  "fill-sps-fg-dark",
] as const;

function Path(props: {
  randomOffset: number;
  width: number;
  height: number;
  class: string;
  index: number;
}) {
  const pathData = createMemo(() => {
    const { height, width, index: pathIndex } = props;

    const layerHeightMultiplier = LAYERS.length > 1 ? pathIndex / (LAYERS.length - 1) : 0;
    const y = height * (0.12 + 0.6 * layerHeightMultiplier);

    let step = pathIndex * 97 + props.randomOffset;
    const X = [];
    const Y = [];
    for (let i = 0; i <= COMPLEXITY; i++) {
      step = (step * 9301 + 49_297) % 233_280;
      X.push((width * i) / COMPLEXITY);
      Y.push(y + (step / 233_280) * AMPLITUDE);
    }

    let accumOutput = Y[0].toFixed(1);
    for (let i = 0; i < COMPLEXITY; i++) {
      const previousComplexityIndex = i ? i - 1 : i;
      const complexityIndex = i + 2 <= COMPLEXITY ? i + 2 : i + 1;
      const x1 = X[i];
      const y1 = Y[i];
      const x2 = X[i + 1];
      const y2 = Y[i + 1];
      accumOutput +=
        " C" +
        (x1 + (x2 - X[previousComplexityIndex]) * SMOOTHNESS).toFixed(1) +
        "," +
        (y1 + (y2 - Y[previousComplexityIndex]) * SMOOTHNESS).toFixed(1) +
        " " +
        (x2 - (X[complexityIndex] - x1) * SMOOTHNESS).toFixed(1) +
        "," +
        (y2 - (Y[complexityIndex] - y1) * SMOOTHNESS).toFixed(1) +
        " " +
        x2.toFixed(1) +
        "," +
        y2.toFixed(1);
    }
    return `M0,${accumOutput} L${width},${height} L0,${height} Z`;
  });
  return (
    <path
      class={[
        "motion-safe:animate-parallax motion-safe:animation-range-[0_1000px] motion-safe:animation-root-scroll",
        props.class,
      ]}
      style={{ "--parallax-speed": (LAYERS.length - props.index) * 20 }}
      d={pathData()}
    />
  );
}

export function Terrain(props: { class?: string; height: number; width: number }) {
  // TODO ssr stability
  const randomOffset = createMemo(() => Math.trunc(Math.random() * 99_999) + 7);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${props.width} ${props.height}`}
      class={props.class}
    >
      <For each={LAYERS}>
        {(colorClass, index) => (
          <Path
            randomOffset={randomOffset()}
            width={props.width}
            height={props.height}
            class={colorClass}
            index={index()}
          />
        )}
      </For>
    </svg>
  );
}
