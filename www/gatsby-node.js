const { createFilePath } = require("gatsby-source-filesystem");

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
