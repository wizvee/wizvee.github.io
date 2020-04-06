import React from 'react';
import { Link } from 'gatsby';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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

const PostsContainer = ({ posts }) => {
  const selectTag = useSelector((state) => state.tag);
  const isAll = selectTag === 'All';
  const filteredPosts = isAll
    ? posts
    : posts.filter(({ node }) => node.frontmatter.tags.includes(selectTag));

  return (
    <div>
      {filteredPosts.map(({ node }) => (
        <Article key={node.id} to={node.fields.slug}>
          {node.frontmatter.title}
        </Article>
      ))}
      {/* {posts.map(({ node }) => (
        <Article key={node.id} to={node.fields.slug} className="none">
          <header>
            <h2 className="primary">{node.frontmatter.title}</h2>
            <small>{node.frontmatter.date}</small>
          </header>
          <p>{node.excerpt}</p>
        </Article>
      ))} */}
    </div>
  );
};

export default PostsContainer;
