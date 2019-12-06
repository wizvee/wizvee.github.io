---
type: 'portfolio'
title: 'figtable'
period: '2019.10 ~ 2019.11'
featuredImage: '../../images/portfolio_figtable.png'
demeVideo: 'https://www.youtube.com/watch?v=eOgEgHbfjTA'
website: 'https://rclass.iptime.org/19PM_figtable_final'
github: 'https://github.com/wizvee/FigTable'
---

## 프로젝트 개요

### 참여인원

4명 (**팀장:** 조정혜 외 3인)

### 개발 환경

- **백엔드:** Spring Framework 5.x
- **프런트엔드:** React 16.x
- **데이터베이스:** Oracle 11g Express

### 내 업무범위

- 기획 25%, DB 설계 25%
- 메인 페이지 및 유저 페이지 전반의 프런트엔드·백엔드를 개발했습니다. 제가 개발한 기능은 아래 **기능**에서 화면과 함께 자세히 서술하였습니다. ✍

### 설명

사용자 위치를 기반으로 맛집을 검색하고 원격 줄서기가 가능한 웹 애플리케이션입니다. 리뷰 작성이 가능하며 이를 기반으로 가벼운 SNS 기능을 제공합니다.

사장님 계정을 위한 사장님 페이지를 제공합니다. 관리자 계정을 위한 관리자 페이지를 제공합니다.

## DB 설계

![ERD](../../images/portfolio_figtable_erd.png)

## 주요 기능

**제가 개발한 메인 페이지 및 유저 페이지의 기능 위주로 서술한 내용입니다. 😊**

쿠폰 페이지, 사장님 페이지 그리고 관리자 페이지 등 실제 웹 애플리케이션에서 더 많은 기능을 확인하실 수 있습니다!

### 기본기능

HTML5 Geolocation API를 이용한 유저의 현재 위치를 기반으로 6km 이내 맛집을 검색하여 메인 페이지에 출력합니다. 또한 원격 줄서기 시 현재 위치가 맛집 위치와 3km 이상 먼 경우 줄서기를 할 수 없도록 했습니다.

해당 위치 정보는 클라이언트 사이드에서 Redux로 상태 관리되며 필요할 때마다 API에 데이터를 전달하는 방식입니다.

1. ![메인 페이지](../../images/portfolio_figtable_fn.png)
2. ![검색 페이지](../../images/portfolio_figtable_fn2.png)
3. ![원격 줄서기](../../images/portfolio_figtable_fn3.png)
4. ![줄서기 모달](../../images/portfolio_figtable_fn4.png)

맛집 별 상세 페이지가 제공됩니다. Google Map API를 이용해 맛집 위치가 표시됩니다.

회원가입 시 카카오톡으로 소셜 로그인이 가능합니다. 로그인 시 맛집에 리뷰를 작성할 수 있습니다. 리뷰 작성 시 포인트가 지급되며 리뷰를 삭제할 때는 포인트가 차감됩니다.

1. ![상세 페이지](../../images/portfolio_figtable_fn5.png)
2. ![회원가입](../../images/portfolio_figtable_fn6.png)
3. ![리뷰 작성](../../images/portfolio_figtable_fn7.png)
4. ![리뷰 보기](../../images/portfolio_figtable_fn8.png)

### 소셜기능

리뷰에 공감할 수 있으며 댓글을 달 수 있습니다. 만약 적절하지 못한 리뷰가 있을 경우 리뷰를 신고할 수도 있습니다.

유저끼리 서로 팔로잉할 수 있으며 팔로잉한 유저의 리뷰를 모아 피드를 제공합니다.

1. ![유저 팔로잉](../../images/portfolio_figtable_fn9.png)
2. ![댓글 달기](../../images/portfolio_figtable_fn10.png)
3. ![리뷰 신고](../../images/portfolio_figtable_fn11.png)
4. ![리뷰 피드](../../images/portfolio_figtable_fn12.png)

### 기타기능

내가 쓴 리뷰를 모아 확인할 수 있습니다. 만약 내가 남긴 리뷰가 신고되었다면 경고가 쌓이게 되는데 이때는 포인트를 이용해 경고를 풀 수 있습니다.

포인트 적립 및 사용을 조회할 수 있습니다. 또한 채팅형 문의하기를 통해 여러 내용을 문의할 수 있습니다.

1. ![내가 쓴 리뷰](../../images/portfolio_figtable_fn13.png)
2. ![경고 풀기](../../images/portfolio_figtable_fn14.png)
3. ![포인트 조회](../../images/portfolio_figtable_fn15.png)
4. ![문의하기](../../images/portfolio_figtable_fn16.png)

## 느낀 점

프로젝트를 진행하면서 리액트의 기본기를 익힐 수 있었습니다. 또한 유저의 액션에 따라 결과를 실시간으로 화면에 반영하기 위해 클라이언트 사이드에서 상태 관리를 고민하게 되었고 그 결과 Redux를 도입하기도 했습니다. 낯선 아키텍처였기 때문에 시행착오도 많이 겪었지만 결과적으로 도입이 성공적이어서 무척 기뻤던 기억이 있습니다.

다만 백엔드 개발 시 OAuth로 JWT를 고려했지만 결국 도입하지 못한 것이 아쉬움으로 남습니다.
