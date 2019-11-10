import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Profile from '../components/Profile'

const Article = styled.article`
  header {
    margin-bottom: 0.5rem;
    h3 {
      margin-bottom: 0.3rem;
    }
  }
`

const Index = ({ data }) => {
  return (
    <Layout>
      <Profile />
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Article key={node.id}>
          <header>
            <h3 className="primary">{node.frontmatter.title}</h3>
            <small>{node.frontmatter.date}</small>
          </header>
          <p>{node.excerpt}</p>
        </Article>
      ))}
    </Layout>
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
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`
