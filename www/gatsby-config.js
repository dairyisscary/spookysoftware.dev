const path = require("path");

const TITLE = "Spooky Software";
const SITE_URL = "https://www.spookysoftware.dev";

module.exports = {
  siteMetadata: {
    title: TITLE,
    description: "Personal website and blog of Eric Kim-Butler",
    author: "Eric Kim-Butler",
    siteUrl: SITE_URL,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: path.join(__dirname, "src/content/blog"),
        name: "blog",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        excerpt_separator: "<!-- endexcerpt -->",
        plugins: [
          "gatsby-remark-smartypants",
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "@": path.join(__dirname, "src"),
      },
    },
    "gatsby-plugin-typescript",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        postCssPlugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          query GetSiteMetadataForFeeds {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(({ node }) => ({
                ...node.frontmatter,
                description: node.excerpt,
                url: `${SITE_URL}${node.fields.slug}`,
                guid: `${SITE_URL}${node.fields.slug}`,
                custom_elements: [{ "content:encoded": node.html }],
              }));
            },
            query: `
              query GetFeedPosts {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___publishDate] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        publishDate
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: `${TITLE} RSS Feed`,
          },
        ],
      },
    },
  ],
};
