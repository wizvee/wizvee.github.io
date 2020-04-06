import React from 'react';
import styled, { css } from 'styled-components';
import { lightTheme } from '../../styles/palette';

// const shadowFlat = css`
//   box-shadow: 3px 3px 4px ${lightTheme.shadow_dark},
//     -3px -3px 4px ${lightTheme.shadow_light};
// `;

const shadowPressed = css`
  box-shadow: inset 3px 3px 4px ${lightTheme.shadow_dark},
    inset -3px -3px 4px ${lightTheme.shadow_light};
`;

const buttonStyle = css`
  padding: 0.3rem 0.5rem;
  border: none;
  border-radius: 0.3rem;
  background: ${lightTheme.base};
  color: ${lightTheme.text};
  transition: all 0.4s ease-in-out;
  outline: none;
  cursor: pointer;
`;

const ButtonBlock = styled.button`
  ${buttonStyle}
  ${(props) =>
    props.selected &&
    css`
      ${shadowPressed}
    `}
  &:hover {
    ${shadowPressed}
  }
  &:active {
    ${shadowPressed}
  }
`;

export const PressedButton = (props) => <ButtonBlock {...props} />;
