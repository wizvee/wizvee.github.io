import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
import Footer from './Footer';

// 테마 객체 생성
export const darkTheme = {
  body: '#292d3e',
  text: '#a6accd',
  primary: '#c792ea',
  second: '#f9c76a',
  third: '#c3e88d',
};

export const lightTheme = {
  body: '#f3f2e9',
  text: '#7d7069',
  primary: '#ff6969',
  second: '#f7a54a',
  third: '#98c05d',
};

const GlobalStyle = createGlobalStyle`
 /* 글로벌 스타일 설정 */
 body {
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  .primary {
    color: ${({ theme }) => theme.primary};
  }
  .nomal {
    color: ${({ theme }) => theme.text};
  }
  .mark {
    background: ${({ theme }) => theme.second};
    color: ${({ theme }) => theme.body};
  }
  .tags {
    padding: 0.2rem 0.3rem;
    border-radius: 0.3rem;
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
    font-size: 0.85rem;
    cursor: pointer;
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
    padding: 1px 3px;
    border: 1px solid ${({ theme }) => theme.primary};
    background:${({ theme }) => theme.body};
    color: ${({ theme }) => theme.primary};
    font-size: 0.85rem;
  }
  &::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.body};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.text};
  }
 }
 h1 {
  color: ${({ theme }) => theme.primary};
 }
 h2 {
  color: ${({ theme }) => theme.second};
 }
 h3 {
  color: ${({ theme }) => theme.third};
 }
 a {
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  &::before {
    content: '🔗';
    font-size: 0.7rem;
  }
  &.none::before {
    display: none;
  }
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
