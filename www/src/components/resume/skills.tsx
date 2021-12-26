import { classnames } from "@/util/style";

import { skill, level } from "./skills.module.scss";

export function Skill({ title, value }: { title: string; value: number }) {
  const width = `${Math.min(100, Math.max(0, value * 100))}%`;
  return (
    <li className={classnames(skill, "flex items-center mb-2 last:mb-0")}>
      <div className="lg:w-2/3 w-5/12 pr-1.5 text-sm print:text-xs col-span-2">
        {title}
      </div>
      <div className="overflow-hidden rounded-sm flex-1 h-2 bg-resume-context">
        <div
          className={classnames(level, "h-full bg-resume-context-accent")}
          style={{ width }}
          aria-hidden="true"
        />
        <span className="sr-only">{width} out of 100</span>
      </div>
    </li>
  );
}
