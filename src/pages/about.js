import React from 'react';
import { graphql } from 'gatsby';
import PageTransition from 'gatsby-plugin-page-transitions';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Portfolio from '../components/Portfolio';

export default ({
  data: {
    allMarkdownRemark: { edges: pf },
  },
}) => {
  const Container = styled.div`
    ul {
      margin-top: 1rem;
      margin-left: 2rem;
      li {
        line-height: 170%;
      }
    }
    h2 {
      margin-top: 2rem;
      &:nth-child(1) {
        margin-top: 0;
      }
    }
    h3 {
      margin-top: 1rem;
    }
    .portfolios {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 0.3rem;
      margin-top: 1rem;
      @media (max-width: 426px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `;

  return (
    <PageTransition>
      <Layout>
        <Container>
          <h2>Intro</h2>
          <div>
            <p>
              안녕하세요, 저는 프런트엔드 개발자를 꿈꾸고 있는 조정혜라고
              합니다.{' '}
              <span role="img" aria-label="Grinning Face With Smiling Eyes">
                😄
              </span>
            </p>
            <p>
              내가 하고 싶은 일을 마음껏 할 수 있는 삶을 살고자 결심했고 그
              답으로써 프로그래밍을 찾게 되었습니다. 비전공자이지만 이제는
              취미가 개발이라고 할 수 있을 만큼 즐겁게 공부 중입니다.
            </p>
            <p>
              프로그래밍 중에서도 자바스크립트와 리액트를 좋아합니다. 최근에는
              타입스크립트를 배우는 중이에요.
            </p>
            <p>
              호기심이 많아 새로운 걸 배우는 것을 좋아하고 모르는 게 있으면
              알아낼 때까지 잠도 못 이루는 성격입니다. 스스로는 개발자가 천직인
              것 같다고 생각 중입니다.
            </p>
          </div>
          <h2>Stacks</h2>
          <div>
            <ul>
              <li>
                <b className="primary">React.js</b>
              </li>
              <li>
                <b className="primary">Javascript</b>
              </li>
              <li>Spring</li>
              <li>Java</li>
              <li>Oracle</li>
            </ul>
          </div>
          <h2>Projects</h2>
          <div className="portfolios">
            {pf.map(({ node }) => (
              <Portfolio key={node.id} node={node} />
            ))}
          </div>
          <h2>Education</h2>
          <div>
            <h3>kh정보교육원</h3>
            <small>2019.05 ~ 2019.11</small>
            <p>자바(JAVA) 프레임워크 개발자 양성과정 39회차</p>
          </div>
        </Container>
      </Layout>
    </PageTransition>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { type: { eq: "portfolio" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            period
            demeVideo
            website
            github
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 768) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
