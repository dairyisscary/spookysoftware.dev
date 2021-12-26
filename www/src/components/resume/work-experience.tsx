import type { ReactNode } from "react";

import { classnames } from "@/util/style";

import { roles } from "./work-experience.module.scss";

type BasicProps = { children: ReactNode };

export function RoleDescription({ children }: BasicProps) {
  return <p className="print:text-sm pt-4">{children}</p>;
}

export function RoleTitle({
  children,
  start,
  end,
  organization,
  location,
}: {
  children: ReactNode;
  start: number;
  end?: number;
  location: ReactNode;
  organization: ReactNode;
}) {
  return (
    <>
      <div className="flex gap-4 items-baseline justify-between">
        <h3 className="font-semibold text-xl print:text-lg">{children}</h3>
        <p className="text-resume-secondary text-right italic text-sm">
          {location}
        </p>
      </div>
      <h4 className="text-lg print:text-base">{organization}</h4>
      <p className="relative mt-1.5 text-sm before:absolute before:-left-[17px] before:top-1/2 before:rounded-full before:bg-resume-primary before:w-2.5 before:h-2.5 before:-translate-x-1/2 before:-translate-y-1/2">
        {start}-{end !== undefined ? end : "present"}
      </p>
    </>
  );
}

export function Role({ children }: BasicProps) {
  return (
    <li className="last:flex-1 visible pl-4 first:pt-1.5 print:first:pt-0 pb-9 print:pb-7 border-l-2 border-resume-primary transition-opacity">
      {children}
    </li>
  );
}

export function Roles({ children }: BasicProps) {
  return (
    <ol className={classnames(roles, "flex flex-col flex-1 invisible")}>
      {children}
    </ol>
  );
}
