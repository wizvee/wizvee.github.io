import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
import PostToc from '../components/PostToc';

const Container = styled.div`
  h2 {
    margin: 2rem 0 1rem;
  }
  h3 {
    margin: 1rem 0;
  }
  small {
    display: inline-block;
    margin-bottom: 1rem;
  }
  ol,
  ul {
    margin-left: 2rem;
  }
  li + li {
    margin-top: 0.7rem;
  }
  li > ul {
    list-style: disc;
  }
`;

const postTemplate = ({ data: { markdownRemark: post } }) => {
  return (
    <Layout>
      <Container>
        <h1>{post.frontmatter.title}</h1>
        <small>{post.frontmatter.date}</small>
        <PostToc />
        <div
          id="post--content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Container>
    </Layout>
  );
};

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
`;

export default postTemplate;
