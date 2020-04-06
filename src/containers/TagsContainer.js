import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

import { lightTheme } from '../styles/palette';
import { setTag } from '../state/createStore';

const TagsBlock = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 1rem 0 2rem;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  span {
    flex: 0 0 auto;
  }
  span + span {
    margin-left: 0.5rem;
  }
`;

const TagItem = styled.span`
  color: ${lightTheme.gray};
  font-size: 0.938rem;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      color: ${lightTheme.primary};
    `}
`;

const TagsContainer = ({ tags }) => {
  const selectTag = useSelector((state) => state.tag);
  const dispatch = useDispatch();

  return (
    <TagsBlock>
      {tags.map(([tag, count]) => (
        <TagItem
          key={tag}
          active={selectTag === tag}
          onClick={() => dispatch(setTag(tag))}
        >
          {tag} <small>({count})</small>
        </TagItem>
      ))}
    </TagsBlock>
  );
};

export default TagsContainer;
