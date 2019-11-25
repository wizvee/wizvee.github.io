import React from 'react'
import PageTransition from 'gatsby-plugin-page-transitions'
import styled from 'styled-components'
import Layout from '../components/Layout'

export default () => {
  const Container = styled.div`
    margin-bottom: 1rem;
    div {
      margin-bottom: 1rem;
    }
    ul {
      margin-top: 1rem;
      transform: translateX(1rem);
      li {
        line-height: 170%;
      }
    }
    h3 {
      margin-top: 1rem;
    }
  `

  return (
    <PageTransition>
      <Layout>
        <Container>
          <h2>Intro</h2>
          <div>
            <p>
              안녕하세요, 저는 프런트엔드 개발자를 꿈꾸고 있는 조정혜라고
              합니다. 😄
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
              것 같다고 생각합니다. 👩‍💻
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
          <div>
            <h3>figtable</h3>
            <span>2019.10 ~ 2019.11</span>
            <p>
              <b>URL:</b>{' '}
              <a
                href="https://rclass.iptime.org/19PM_figtable_final"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://rclass.iptime.org/19PM_figtable_final
              </a>
              <br />
              <b>Github:</b>{' '}
              <a
                href="https://github.com/wizvee/FigTable"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/wizvee/FigTable
              </a>
            </p>
            <h4>개발 환경</h4>
            <p>
              <span class="primary">프런트엔드</span> React /{' '}
              <span class="primary">백엔드</span> Spring을 이용한 RESTful API
            </p>
            <h4>주요 기능</h4>
            <p>
              현재 위치를 기반으로 맛집을 검색, 원격 줄서기를 할 수 있습니다.
              또한 맛집에 리뷰를 남길 수 있으며 이를 기반으로 기초적인 SNS기능을
              제공합니다. 원하는 유저를 팔로잉하면 리뷰 피드를 받아볼 수
              있습니다.
            </p>
          </div>
          <h2>Education</h2>
          <div>
            <h3>kh정보교육원</h3>
            <span>2019.05 ~ 2019.11</span>
            <p>자바(JAVA) 프레임워크 개발자 양성과정 39회차</p>
          </div>
        </Container>
      </Layout>
    </PageTransition>
  )
}
