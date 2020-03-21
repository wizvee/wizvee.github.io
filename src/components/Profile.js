import React from 'react';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';

const Twist = keyframes`
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.3;
    transform: translateY(-0.1rem);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  75% {
    opacity: 0.3;
    transform: translateY(-0.1rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  padding-bottom: 2rem;
  .author {
    display: inline-block;
    padding: 0.1rem 0.3rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 600;
    animation: ${Twist} 3s alternate infinite;
  }
  .desc {
    padding-left: 0.2rem;
    font-size: 0.9rem;
  }
`;

const Profile = () => {
  return (
    <Container>
      <Link to="/" className="mark author none">
        @wizvee
      </Link>
      <div className="desc">
        풀스택을 꿈꾸는 주니어 개발자입니다!{' '}
        <span role="img" aria-label="Smiling Face With Smiling Eyes">
          😊
        </span>
      </div>
    </Container>
  );
};

export default Profile;
