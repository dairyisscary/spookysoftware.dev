import React from "react";

import Styles from "./content.module.scss";

function PageContent({ children }: { children: React.ReactNode }) {
  return <div className={Styles.content}>{children}</div>;
}

export default PageContent;
