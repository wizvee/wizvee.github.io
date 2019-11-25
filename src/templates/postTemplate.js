import React from 'react'
import { graphql } from 'gatsby'
import PageTransition from 'gatsby-plugin-page-transitions'
import styled from 'styled-components'
import Layout from '../components/Layout'

const postTemplate = ({ data }) => {
  const post = data.markdownRemark

  const Container = styled.div`
    margin-bottom: 4rem;
    h1 {
      font-family: 'Binggrae-Bold';
    }
    small {
      display: inline-block;
      margin-bottom: 1rem;
    }
  `

  return (
    <PageTransition>
      <Layout>
        <Container>
          <h1>{post.frontmatter.title}</h1>
          <small>{post.frontmatter.date}</small>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Container>
      </Layout>
    </PageTransition>
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
