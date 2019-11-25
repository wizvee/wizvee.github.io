import React from 'react'
import { Link, graphql } from 'gatsby'
import PageTransition from 'gatsby-plugin-page-transitions'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Profile from '../components/Profile'

const Article = styled(Link)`
  display: block;
  color: inherit;
  & + & {
    margin-top: 2rem;
  }
  header {
    h2 {
      margin: 0;
      margin-bottom: 0.3rem;
    }
  }
  p {
    font-size: 0.9rem;
  }
`

const Index = ({ data }) => {
  return (
    <PageTransition>
      <Layout>
        <Profile />
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Article key={node.id} to={node.fields.slug}>
            <header>
              <h2 className="primary">{node.frontmatter.title}</h2>
              <small>{node.frontmatter.date}</small>
            </header>
            <p>{node.excerpt}</p>
          </Article>
        ))}
      </Layout>
    </PageTransition>
  )
}

export default Index

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt(truncate: true)
        }
      }
    }
  }
`
