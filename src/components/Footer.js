import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding: 2rem 0 1rem;
  small {
    font-weight: 600;
  }
`

const Footer = () => {
  return (
    <Container>
      <small>
        Copyright 2019 <span className="primary">@wizvee</span>
      </small>
    </Container>
  )
}

export default Footer
