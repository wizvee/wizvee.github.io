import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding-bottom: 2rem;
  .author {
    display: inline-block;
    padding: 0.2rem 0.4rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: bold;
  }
  .desc {
    padding-left: 0.2rem;
    font-size: 0.9rem;
  }
`

const Profile = () => {
  return (
    <Container>
      <span className="mark author">@wizvee</span>
      <div clasName="desc">프런트엔드 개발자를 꿈꾸고 있습니다! ☺</div>
    </Container>
  )
}

export default Profile
