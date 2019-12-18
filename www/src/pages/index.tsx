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
    date: string;
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
        <div key={node.id} className="mb-10">
          <PageTitle>
            <Link className="no-underline" to={node.fields.slug}>
              {node.frontmatter.title}
            </Link>
          </PageTitle>
          <BlogDate>{node.frontmatter.date}</BlogDate>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
