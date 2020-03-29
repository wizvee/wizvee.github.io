---
type: 'series'
topic: 'Vue.js 알아보기'
title: 'Router, Navigation guards'
date: '2020-03-26'
tags: ['Vue']
---

## Router

### Router Navigation Guard

**데이터 호출 시점**

1. 컴포넌트 라이프 사이클 훅

   - created: 컴포넌트가 생성되자 마자 호출되는 로직

2. **라우터 네비게이션 가드**

   - 특정 url로 접근하기 전에 동작을 정의하는 속성
   - `next()` 함수를 호출하지 않으면 다음 url, 즉 to로 넘어가지 않음

### Transitions
