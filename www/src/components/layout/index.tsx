import type { ReactNode } from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import Footer from "./footer";
import Intro from "./intro";

type Props = {
  children: ReactNode;
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
    <div className="flex flex-col mx-auto max-w-4xl">
      <Helmet
        title={metaTitle}
        meta={getMeta({
          title: metaTitle,
          description: metaDesc,
          author: siteMetadata.author,
        })}
      />
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
