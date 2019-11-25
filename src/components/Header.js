import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { lightTheme } from './Layout'

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 2rem 0;
  h1,
  h2 {
    flex: 1;
    margin: 0;
  }
`

const Toggle = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.2rem;
  width: 3rem;
  height: 1.5rem;
  border-radius: 1.5rem;
  cursor: pointer;

  .planet {
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }

  &.day {
    justify-content: flex-start;
    background: #97deff;
    .planet {
      background: #ffd5a4;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
  }

  &.night {
    justify-content: flex-end;
    background: #4d6586;
    .planet {
      background: #fbf7d6;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
  }
`

export default ({ theme, onToggle }) => {
  const [pathname, setPathname] = useState('/')

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  return (
    <Container>
      <Link to="/">
        {pathname === '/' ? <h1>Wizvee</h1> : <h2 className="nomal">Wizvee</h2>}
      </Link>
      <Toggle
        className={theme === lightTheme ? 'day' : 'night'}
        onClick={onToggle}
      >
        <div className="planet" />
      </Toggle>
    </Container>
  )
}
