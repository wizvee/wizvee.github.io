import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { lightTheme } from '../styles/palette';

const darkTheme = {};

const GlobalStyle = createGlobalStyle`
 /* 글로벌 스타일 설정 */
 body {
  background: ${({ theme }) => theme.base};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  .primary {
    color: ${({ theme }) => theme.primary};
  }
  .nomal {
    color: ${({ theme }) => theme.text};
  }
  .mark {
    /* background: ${({ theme }) => theme.second}; */
    color: ${({ theme }) => theme.base};
  }
  .selected {
    background: ${({ theme }) => theme.primary};
  }
  p {
    margin: 1rem 0;
    & + & {
      margin-top: 0;
    }
  }
  strong {
    color: ${({ theme }) => theme.primary};
  }
  code[class="language-text"] {
    padding: 0 0.25rem;
    font-size: 0.9rem;
    font-family: 'Fira Code', 'S-CoreDream-4Regular';
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.base};
    text-shadow: none;
  }
  div.gatsby-highlight pre {
    background: ${({ theme }) => theme.base};
    box-shadow: inset 4px 4px 8px ${lightTheme.shadow_dark},
      inset -4px -4px 8px ${lightTheme.shadow_light};
      span {
        font-family: 'Fira Code', 'S-CoreDream-4Regular';
      }
      span.comment {
        color: ${({ theme }) => theme.text};
        font-size: 0.95rem;
      }
      span.operator {
        background: ${({ theme }) => theme.base};
      }
  }
  span.gatsby-resp-image-wrapper {
    border-radius: 0.3rem;
    border: 0.3rem solid ${({ theme }) => theme.base};
    background: ${({ theme }) => theme.base};
    box-shadow: 4px 4px 8px ${lightTheme.shadow_dark},
    -4px -4px 8px ${lightTheme.shadow_light};
    overflow: hidden;
    img {
        border-radius: 0.3rem;
      }
  }


  &::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.base};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.text};
  }
 }
 h1 {
  color: ${({ theme }) => theme.primary};
 }
 h2 {
  /* color: ${({ theme }) => theme.second}; */
 }
 h3 {
  /* color: ${({ theme }) => theme.third}; */
 }
 a {
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
 }
`;

const ResponsiveBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto; /* 중앙 정렬 */
  padding: 0 2rem;
  width: 768px;
  max-width: 100%;
  min-height: 100vh;

  /* 브라우저 크기에 따라 가로 크기 변경 */
  @media (max-width: 768px) {
    padding: 0 2rem;
  }
  @media (max-width: 426px) {
    padding: 0 1rem;
    width: 100%;
  }
`;

const Layout = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);

  // 테마 토글 이벤트 핸들러
  const onToggle = () => {
    if (theme === lightTheme) {
      localStorage.setItem('theme', 'dark');
      return setTheme(darkTheme);
    } else {
      localStorage.setItem('theme', 'light');
      return setTheme(lightTheme);
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      if (theme === 'light') setTheme(lightTheme);
      else setTheme(darkTheme);
    } else {
      // 웹 스토리지에 'theme'가 없을 경우 기기 설정에 따름
      if (window.matchMedia('(prefers-color-scheme: dark)').matches)
        setTheme(darkTheme);
      else setTheme(lightTheme);
    }
  }, []);

  return (
    <>
      <GlobalStyle theme={theme} />
      <ResponsiveBlock>
        <Header theme={theme} onToggle={onToggle} />
        {children}
        <Footer />
      </ResponsiveBlock>
    </>
  );
};

export default Layout;
