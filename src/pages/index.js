import React from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';

import { _pipe } from '../lib/utils';
import Layout from '../components/Layout';
import TagsContainer from '../containers/TagsContainer';
import PostsContainer from '../containers/PostsContainer';

const validNodes = _.curryRight(_.filter)(({ node }) => node.frontmatter.type);

const validTags = _pipe(
  _.curryRight(_.map)(({ node }) => node.frontmatter.tags),
  _.curry(_.flatten),
  _.curryRight(_.countBy)((tag) => tag),
  _.curry(_.toPairs),
);

function addAllTag(posts, tags) {
  tags.push(['All', posts.length]);
  return tags;
}

const Index = ({ data: { allMarkdownRemark: md } }) => {
  const posts = validNodes(md.edges);
  const tags = addAllTag(posts, validTags(posts)).sort((a, b) => b[1] - a[1]);

  return (
    <Layout>
      <TagsContainer tags={tags} />
      <PostsContainer posts={posts} />
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
    }
  }
`;
