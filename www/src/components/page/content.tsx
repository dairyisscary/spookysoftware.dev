import React from "react";

import { content } from "./content.module.scss";

function PageContent({ children }: { children: React.ReactNode }) {
  return <div className={content}>{children}</div>;
}

export default PageContent;
