import type { ReactNode } from "react";

import { content } from "./content.module.scss";

function PageContent({ children }: { children: ReactNode }) {
  return <div className={content}>{children}</div>;
}

export default PageContent;
