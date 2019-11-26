import React from 'react'
import PageTransition from 'gatsby-plugin-page-transitions'
import styled from 'styled-components'
import Layout from '../components/Layout'

export default () => {
  const Container = styled.div`
    div {
      margin-bottom: 1rem;
    }
    ul {
      margin-top: 1rem;
      transform: translateX(2rem);
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
            <span className="primary">팀 프로젝트</span>
            <br />
            <small>2019.10 ~ 2019.11</small>
            <p>
              <b>URL</b>{' '}
              <a
                href="https://rclass.iptime.org/19PM_figtable_final"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://rclass.iptime.org/19PM_figtable_final
              </a>
              <br />
              <b>Github</b>{' '}
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
              <span className="primary">프런트엔드</span> React, 모바일까지
              대응한 반응형 웹
              <br />
              <span className="primary">백엔드</span> Spring을 이용한 RESTful
              API, Oracle
            </p>
            <h4>주요 기능</h4>
            <div>
              <p className="primary">유저 페이지</p>
              <p>
                현재 위치를 기반으로 맛집을 검색, 원격 줄서기를 할 수 있습니다.
                원격 줄서기의 경우 현재 위치가 식당보다 3km 이상 먼 경우 이용할
                수 없습니다. 실시간으로 나보다 먼저 줄을 선 대기 인원을 알아볼
                수 있습니다.
              </p>
              <p>
                또한 맛집에 리뷰를 남길 수 있으며 이를 기반으로 기초적인 SNS
                기능을 제공합니다. 원하는 유저를 팔로잉 하면 리뷰 피드를 받아볼
                수 있습니다. 또한 부적절한 리뷰를 남겨 관리자에 의해 삭제될 경우
                경고를 받게 됩니다. 경고가 3번 누적될 경우 원격 줄서기가
                불가합니다.
              </p>
              <p>
                웹 애플리케이션에서 활동한 내역에 따라 포인트가 지급되고
                차감됩니다. 해당 포인트는 잇딜(쿠폰)을 구매하거나 부적절한
                리뷰로 받은 경고를 차감하는데 사용됩니다. 이는 모두
                마이페이지에서 조회 및 관리가 가능합니다.
              </p>
            </div>
            <div>
              <span className="primary">사장님 페이지</span>
              <p>
                가입 시 식당을 검색하거나 등록할 수 있습니다. 사장님 가입의 경우
                관리자의 승인이 필요합니다. 승인이 되면 본인의 식당 정보를
                관리할 수 있습니다.
              </p>
              <p>
                잇딜(쿠폰)을 등록하거나 관리할 수 있습니다. 또한 각 식당에서
                발행한 쿠폰의 구매자를 조회할 수 있으며 사용한 쿠폰의 경우
                전환이 가능합니다.
              </p>
            </div>
            <div>
              <span className="primary">관리자 페이지</span>
              <p>
                식당을 추가로 등록하거나 폐업처리할 수 있습니다. 사장님 가입 시
                입력한 정보로 판단하여 가입을 승인하거나 거절할 수 있습니다.
              </p>
              <p>
                신고된 리뷰를 삭제하거나 복구할 수 있습니다. 또한 유저의
                문의사항에 답변할 수 있습니다.
              </p>
            </div>
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
  )
}
