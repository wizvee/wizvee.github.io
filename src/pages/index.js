import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
// import _ from 'lodash';

import Layout from '../components/Layout';
import { PressedButton } from '../components/common/Button';

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

const TagsBlock = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 1rem 0 2rem;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  button {
    flex: 0 0 auto;
  }
  button + button {
    margin-left: 0.5rem;
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
    <Layout>
      <TagsBlock>
        <PressedButton
          key="all"
          selected={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          {`All`}
        </PressedButton>
        {md.group.sort(compareTags).map(({ tag, totalCount }) => (
          <PressedButton
            key={tag}
            selected={filter === tag}
            onClick={() => setFilter(tag)}
          >
            {`${tag} (${totalCount})`}
          </PressedButton>
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
            .filter(({ node: { frontmatter: { tags } } }) =>
              tags.includes(filter),
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
  );
};

export default Index;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            type
            topic
            title
            date(formatString: "DD MMMM, YYYY")
            tags
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
