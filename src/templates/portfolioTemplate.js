import React from 'react';
import { AiOutlineIe, AiFillYoutube, AiFillGithub } from 'react-icons/ai';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PageTransition from 'gatsby-plugin-page-transitions';
import styled from 'styled-components';
import Layout from '../components/Layout';

const Container = styled.div`
  h1 {
    font-family: 'Binggrae-Bold';
  }
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
  img {
    border-radius: 0.5rem;
  }
`;

const FeaturedInfo = styled.div`
  div {
    margin-bottom: 0.5rem;
  }
  span {
    display: block;
    font-weight: 600;
    svg {
      margin: 0 0.3rem;
      transform: translateY(0.2rem);
    }
    a {
      margin-left: 0.7rem;
      font-weight: normal;
    }
  }
`;

const portfolioTemplate = ({ data: { markdownRemark: pf } }) => {
  const featuredImage = pf.frontmatter.featuredImage.childImageSharp.fluid;
  return (
    <PageTransition>
      <Layout>
        <Container>
          <h1>{pf.frontmatter.title}</h1>
          <small>
            <b>{pf.frontmatter.period}</b>
          </small>
          <FeaturedInfo>
            <Img fluid={featuredImage} alt="featuredImage" />
            <span>
              <AiOutlineIe />
              website :
              <a
                href={pf.frontmatter.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pf.frontmatter.website}
              </a>
            </span>
            <span>
              <AiFillGithub />
              github :
              <a
                href={pf.frontmatter.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pf.frontmatter.github}
              </a>
            </span>
            <span>
              <AiFillYoutube />
              demo :
              <a
                href={pf.frontmatter.demeVideo}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pf.frontmatter.demeVideo}
              </a>
            </span>
          </FeaturedInfo>
          <div dangerouslySetInnerHTML={{ __html: pf.html }} />
        </Container>
      </Layout>
    </PageTransition>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        period
        demeVideo
        website
        github
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 768) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default portfolioTemplate;
