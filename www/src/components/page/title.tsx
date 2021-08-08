import type { ReactNode } from "react";

function PageTitle({ children }: { children: ReactNode }) {
  return <h2 className="font-serif text-2xl text-title">{children}</h2>;
}

export default PageTitle;
