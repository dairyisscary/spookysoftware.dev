import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "@/components/layout";
import PageTitle from "@/components/page/title";
import BlogDate from "@/components/blog/date";
import BlogContent from "@/components/blog/content";

type Post = {
  id: string;
  excerpt: string;
  frontmatter: {
    title: string;
    publishDate: string;
    modifiedDate: string;
  };
  fields: {
    slug: string;
  };
};
type Props = {
  data: {
    allMarkdownRemark: {
      edges: { node: Post }[];
    };
  };
};

function IndexPage({ data }: Props) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <Layout includeIntro>
      {posts.map(({ node }) => (
        <div key={node.id} className="mb-20">
          <PageTitle>
            <Link className="no-underline" to={node.fields.slug}>
              {node.frontmatter.title}
            </Link>
          </PageTitle>
          <BlogDate
            publishDate={node.frontmatter.publishDate}
            modifiedDate={node.frontmatter.modifiedDate}
          />
          <BlogContent>{node.excerpt}</BlogContent>
          <Link className="block mt-4" to={node.fields.slug}>
            Read More...
          </Link>
        </div>
      ))}
    </Layout>
  );
}

export default IndexPage;

export const query = graphql`
  query MainPage {
    allMarkdownRemark(
      sort: { fields: [frontmatter___publishDate], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            publishDate(formatString: "YYYY-MM-DD")
            modifiedDate(formatString: "YYYY-MM-DD")
          }
          fields {
            slug
          }
          excerpt(pruneLength: 400, format: HTML)
        }
      }
    }
  }
`;
