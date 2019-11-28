const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({ node, name: `slug`, value: slug })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              type
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges
    .filter(
      ({
        node: {
          frontmatter: { type },
        },
      }) => type === 'post'
    )
    .forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/postTemplate.js`),
        context: {
          slug: node.fields.slug,
        },
      })
    })
  result.data.allMarkdownRemark.edges
    .filter(
      ({
        node: {
          frontmatter: { type },
        },
      }) => type === 'portfolio'
    )
    .forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/portfolioTemplate.js`),
        context: {
          slug: node.fields.slug,
        },
      })
    })
}
