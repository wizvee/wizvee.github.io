import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import _ from 'lodash';

import { _map, _filter, _go, _flatten, _getTotalCount } from '../lib/utils';
import Layout from '../components/Layout';
import TagsContainer from '../containers/TagsContainer';

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

  const filteredPosts = _go(
    md.edges,
    _filter(({ node }) => node.frontmatter.type),
  );

  const filteredTags = _go(
    filteredPosts,
    _map(({ node }) => node.frontmatter.tags),
    _flatten,
    _getTotalCount,
  );

  return (
    <Layout>
      <TagsContainer tags={filteredTags} />
      {filteredPosts.map(({ node }) => (
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
