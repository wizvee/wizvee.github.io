import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Header from './Header'

export const darkTheme = {
  body: '#292d3e',
  text: '#b2ccd6',
  primary: '#c792ea',
  mark: '#ffcf96',
}

export const lightTheme = {
  body: '#f3f2e9',
  text: '#665d5a',
  primary: '#fd8c9f',
  mark: '#ffcf96',
}

const GlobalStyle = createGlobalStyle`
 body {
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  .primary {
    color: ${({ theme }) => theme.primary};
  }
  .mark {
    background: ${({ theme }) => theme.mark}
  }
 }
`

const ResponsiveBlock = styled.div`
  margin: 0 auto; /* 중앙 정렬 */
  padding: 0 3rem;
  width: 768px;

  /* 브라우저 크기에 따라 가로 크기 변경 */
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Layout = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme)

  const onToggle = () => {
    if (theme === lightTheme) return setTheme(darkTheme)
    else return setTheme(lightTheme)
  }

  return (
    <>
      <GlobalStyle theme={theme} />
      <ResponsiveBlock>
        <Header theme={theme} onToggle={onToggle} />
        {children}
      </ResponsiveBlock>
    </>
  )
}

export default Layout
