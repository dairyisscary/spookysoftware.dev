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
        publishDate: string;
        modifiedDate: string;
      };
    };
  };
};

function Post({ data }: Props) {
  const { frontmatter, html } = data.markdownRemark;
  const { title, publishDate, modifiedDate } = frontmatter;
  return (
    <Layout title={title}>
      <PageTitle>{title}</PageTitle>
      <BlogDate publishDate={publishDate} modifiedDate={modifiedDate} />
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
        publishDate(formatString: "YYYY-MM-DD")
        modifiedDate(formatString: "YYYY-MM-DD")
      }
    }
  }
`;
