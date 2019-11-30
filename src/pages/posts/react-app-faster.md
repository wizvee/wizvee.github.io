---
type: 'post'
title: 'React 최적화하기'
date: '2019-11-30'
tags: ['React']
---

## State Colocation

Kent C. Dodds는 [colocation 포스팅](https://kentcdodds.com/blog/colocation)에서 state를 localizing 하는 것이 유지 보수에 이득이고 애플리케이션 퍼포먼스도 향상시킨다고 말했습니다. state가 변할 때 모든 애플리케이션 컴포넌트 트리가 re-render 되는 것보단 관련된 애플리케이션 컴포넌트 트리만 re-render 되는 것이 나을 테니까요.

그리고 [State Colocation will make your react app faster](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster)에서 보다 자세한 효과 및 방법을 설명해 주셨는데요, 저는 **Ideveloper** 님께서 번역해 주신 [이 포스팅](https://ideveloper2.dev/blog/2019-10-12--state-colocation-will-make-your-react-app-faster/)을 참고하여 공부했습니다. 🙋‍♀️

코드를 그대로 적기보다는 제가 이해한 바를 토대로 정리한 내용입니다.

### colocated state

**colocation의 원리**는 **코드를 최대한 그것과 연관 있는 곳에 배치하는 것**입니다. 최대한 영향이 가는 부분을 최소화한다는 개념입니다.

만약 state가 최상위 컴포넌트 트리에 있다면, 리액트는 어떤 것이 바뀌었는지 모르므로 모든 컴포넌트에서 dom의 업데이트 여부를 체크해야만 합니다. 하지만 state를 최대한 그것과 연관 있는 컴포넌트로 내린다면 리액트는 체크할 것이 적어집니다.

굳이 global일 필요가 없는 state라면 global redux store나 global context안에 넣지 말고 관련된 컴포넌트에 state를 위치시키는 것이 효과적입니다.

## useMemo와 useCallback
