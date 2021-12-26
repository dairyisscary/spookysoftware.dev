import type { ReactNode } from "react";

import NewTabLink from "@/components/new-tab-link";

export function Project({
  children,
  href,
  description,
  technology,
}: {
  children: ReactNode;
  href?: string;
  description: ReactNode;
  technology?: ReactNode;
}) {
  return (
    <li>
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold print:text-base">
          {href ? <NewTabLink href={href}>{children}</NewTabLink> : children}
        </h3>
        {technology && (
          <p className="text-sm print:text-xs text-right italic text-resume-secondary">
            {technology}
          </p>
        )}
      </div>
      <p className="mt-1 text-sm print:text-xs">{description}</p>
    </li>
  );
}

export function Projects({ children }: { children: ReactNode }) {
  return <ol className="space-y-4 print:space-y-3">{children}</ol>;
}
