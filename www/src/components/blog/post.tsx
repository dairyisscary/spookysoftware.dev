import React from "react";
import { graphql } from "gatsby";

import Layout from "@/components/layout";
import PageTitle from "@/components/page/title";
import BlogDate from "@/components/blog/date";
import BlogContent from "@/components/blog/content";

type Props = {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        date: string;
      };
    };
  };
};

function Post({ data }: Props) {
  const post = data.markdownRemark;
  return (
    <Layout>
      <PageTitle>{post.frontmatter.title}</PageTitle>
      <BlogDate>{post.frontmatter.date}</BlogDate>
      <BlogContent>{post.html}</BlogContent>
    </Layout>
  );
}

export default Post;

export const query = graphql`
  query GetPost($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`;
