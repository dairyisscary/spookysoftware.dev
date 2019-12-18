import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Styles from "./header.module.scss";

function Header() {
  const data = useStaticQuery(graphql`
    query HeaderTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <header className="flex justify-between items-center py-4 mb-16">
      <h1
        className={`${Styles.siteTitle} tracking-widest font-bold font-cursive text-4xl text-highlight`}
      >
        <Link className="no-underline" to="/">
          {data.site.siteMetadata.title}
        </Link>
      </h1>
      <nav className="flex">
        <Link className="no-underline" to="/about/">
          About
        </Link>
      </nav>
    </header>
  );
}

export default Header;
