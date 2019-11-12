import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'

const postTemplate = ({ data }) => {
  const post = data.markdownRemark

  const Container = styled.div`
    small {
      display: inline-block;
      margin-bottom: 1rem;
    }
    h2 {
      color: #f9c76a;
      margin: 2rem 0 1rem;
    }

    h3 {
      color: #c3e88d;
      margin: 1rem 0;
    }
  `

  return (
    <Layout>
      <Container>
        <h1>{post.frontmatter.title}</h1>
        <small>{post.frontmatter.date}</small>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`

export default postTemplate
