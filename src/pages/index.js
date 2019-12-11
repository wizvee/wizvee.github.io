import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import PageTransition from 'gatsby-plugin-page-transitions';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Profile from '../components/Profile';
import Portfolio from '../components/Portfolio';

const TagsBlock = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 2rem;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  small {
    flex: 0 0 auto;
    padding: 0 0.3rem;
  }
  small + small {
    margin-left: 0.35rem;
  }
`;

const Article = styled(Link)`
  display: block;
  color: inherit;
  & + & {
    margin-top: 1.5rem;
  }
  header {
    h2 {
      margin: 0;
    }
  }
  p {
    font-size: 0.93rem;
  }
`;

const Index = ({ data: { allMarkdownRemark: md } }) => {
  const [filter, setFilter] = useState('all');

  function compareTags(tag1, tag2) {
    return tag1.totalCount > tag2.totalCount
      ? -1
      : tag1.totalCount < tag2.totalCount
      ? 1
      : 0;
  }

  return (
    <PageTransition>
      <Layout>
        <Profile />
        <TagsBlock>
          <small
            key="all"
            className={`tags ${filter === 'all' && 'selected'}`}
            onClick={() => setFilter('all')}
          >
            {`All (${md.edges.length})`}
          </small>
          {md.group.sort(compareTags).map(({ tag, totalCount }) => (
            <small
              key={tag}
              className={`tags ${filter === tag && 'selected'}`}
              onClick={() => setFilter(tag)}
            >
              {`${tag} (${totalCount})`}
            </small>
          ))}
        </TagsBlock>
        {filter === 'all'
          ? md.edges.map(({ node }) => (
              <Article key={node.id} to={node.fields.slug} className="none">
                <header>
                  <h2 className="primary">{node.frontmatter.title}</h2>
                  <small>{node.frontmatter.date}</small>
                </header>
                <p>{node.excerpt}</p>
              </Article>
            ))
          : md.edges
              .filter(
                ({ node: { frontmatter: fm } }) =>
                  fm.type === 'post' && fm.tags.includes(filter),
              )
              .map(({ node }) => (
                <Article key={node.id} to={node.fields.slug} className="none">
                  <header>
                    <h2 className="primary">{node.frontmatter.title}</h2>
                    <small>{node.frontmatter.date}</small>
                  </header>
                  <p>{node.excerpt}</p>
                </Article>
              ))}
      </Layout>
    </PageTransition>
  );
};

export default Index;

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { type: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            period
            demeVideo
            website
            github
            tags
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 768) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt(truncate: true)
        }
      }
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;
