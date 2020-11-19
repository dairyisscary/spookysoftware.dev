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
  const { frontmatter, html } = data.markdownRemark;
  const { title, date } = frontmatter;
  return (
    <Layout title={title}>
      <PageTitle>{title}</PageTitle>
      <BlogDate>{date}</BlogDate>
      <BlogContent>{html}</BlogContent>
    </Layout>
  );
}

export default Post;

export const query = graphql`
  query BlogPostById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`;
