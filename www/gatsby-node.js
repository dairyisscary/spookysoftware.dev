const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async function ({ graphql, actions }) {
  const result = await graphql(`
    query GetMarkdownPages {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const blogPostComponent = path.resolve("src/components/blog/post.tsx");
  const { createPage } = actions;
  const { edges: posts } = result.data.allMarkdownRemark;
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    createPage({
      path: post.node.fields.slug,
      component: blogPostComponent,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = function ({ node, actions, getNode }) {
  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({
      node,
      getNode,
      basePath: "src/content/blog",
    });
    actions.createNodeField({ node, value: `/blog${value}`, name: "slug" });
  }
};
