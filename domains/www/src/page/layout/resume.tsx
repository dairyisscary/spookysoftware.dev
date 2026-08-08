import type { JSX } from "@solidjs/web";

export const SUBGRID_SECTION_CX =
  "col-span-full grid gap-8 md:gap-12 print:gap-x-8 print:gap-y-4 grid-cols-subgrid";

export function Grid(props: { children: JSX.Element }) {
  return (
    <div class="sps-main-contain grid gap-12 py-4 md:grid-cols-3 md:py-12 print:gap-8 print:py-0 print:pt-8">
      {props.children}
    </div>
  );
}
