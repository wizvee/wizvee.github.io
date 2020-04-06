import React from 'react';
import styled from 'styled-components';
import { PressedButton } from '../components/common/Button';

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

const TagsContainer = ({ tags }) => {
  return (
    <TagsBlock>
      {tags.map(([tag, count]) => (
        <PressedButton key={tag}>{`${tag}(${count})`}</PressedButton>
      ))}
    </TagsBlock>
  );
};

export default TagsContainer;
