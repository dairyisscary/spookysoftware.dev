import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

import Favicon64 from "@/images/favicon-64.png";
import Header from "./header";
import Footer from "./footer";
import Intro from "./intro";

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  includeIntro?: boolean;
};
type MetaParams = {
  title: string;
  description: string;
  author: string;
};

function getMeta({ author, title, description }: MetaParams) {
  return [
    {
      name: "description",
      content: description,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary",
    },
    {
      name: "twitter:creator",
      content: author,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
  ];
}

function Layout({ title, children, description, includeIntro }: Props) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query LayoutTitleQuery {
      site {
        siteMetadata {
          title
          author
          description
        }
      }
    }
  `);
  const metaTitle = title
    ? `${title} | ${siteMetadata.title}`
    : siteMetadata.title;
  const metaDesc = description || siteMetadata.description;
  return (
    <div className="flex flex-col mx-auto max-w-3xl">
      <Helmet
        htmlAttributes={{ lang: "en-US" }}
        title={metaTitle}
        meta={getMeta({
          title: metaTitle,
          description: metaDesc,
          author: siteMetadata.author,
        })}
      >
        <link href={Favicon64} rel="shorcut icon" />
        <link
          href="https://fonts.googleapis.com/css?family=Amatic+SC:700|Merriweather|Ubuntu&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className="px-5">
        <Header />
        {includeIntro && <Intro />}
        <main className="mb-20">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
