import React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { AiOutlineIe, AiFillGithub, AiFillYoutube } from '../styles/icons';

const Container = styled.div`
  a {
    position: relative;
    display: block;
    border-radius: 0.5rem;
    overflow: hidden;
    &:hover {
      .portfolio_title {
        visibility: visible;
        opacity: 1;
      }
      img {
        transform: scale(1.1);
      }
    }
    .portfolio_title {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      top: 50%;
      left: 50%;
      width: 110%;
      height: 110%;
      background: rgba(0, 0, 0, 0.7);
      transform: translate(-50%, -50%);
      visibility: hidden;
      opacity: 0;
      transition: all 0.2s linear;
      span {
        font-size: 1.5rem;
        font-weight: 600;
        font-family: 'Binggrae-Bold';
      }
      small {
        color: #fff;
      }
    }
  }
  .portfolio_links {
    margin-top: 0.3rem;
    width: 100%;
    a + a {
      margin-left: 0.5rem;
    }
    a {
      display: inline-flex;
      align-items: center;
      font-weight: normal;
      svg {
        font-size: 1.2rem;
        margin-right: 0.2rem;
      }
    }
    @media (max-width: 426px) {
      display: none;
    }
  }
`;

const Portfolio = ({ node }) => {
  return (
    <Container>
      <Link to={node.fields.slug} className="none">
        <Img
          fluid={node.frontmatter.featuredImage.childImageSharp.fluid}
          alt={node.frontmatter.title}
        />
        <div className="portfolio_title">
          <span>{node.frontmatter.title}</span>
          <small className="nomal">{node.frontmatter.period}</small>
        </div>
      </Link>
      <div className="portfolio_links">
        <a
          className="nomal none"
          href={node.frontmatter.website}
          rel="noopener noreferrer"
          target="_blank"
        >
          <AiOutlineIe className="primary" />
          site
        </a>
        <a
          className="nomal none"
          href={node.frontmatter.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          <AiFillGithub className="primary" />
          git
        </a>
        <a
          className="nomal none"
          href={node.frontmatter.demeVideo}
          rel="noopener noreferrer"
          target="_blank"
        >
          <AiFillYoutube className="primary" />
          demo
        </a>
      </div>
    </Container>
  );
};

export default Portfolio;
