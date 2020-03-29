---
type: 'post'
title: 'React 최적화하기'
date: '2019-11-30'
tags: ['React']
---

## State Colocation

Kent C. Dodds는 [colocation 포스팅](https://kentcdodds.com/blog/colocation)에서 state를 localizing 하는 것이 유지 보수에 이득이고 애플리케이션 퍼포먼스도 향상시킨다고 말했습니다. state가 변할 때 모든 애플리케이션 컴포넌트 트리가 re-render 되는 것보단 관련된 애플리케이션 컴포넌트 트리만 re-render 되는 것이 나을 테니까요.

그리고 [State Colocation will make your react app faster](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster)에서 보다 자세한 효과 및 방법을 설명해 주셨는데요, 저는 **Ideveloper**님께서 번역해 주신 [해당 포스팅](https://ideveloper2.dev/blog/2019-10-12--state-colocation-will-make-your-react-app-faster/)을 참고하여 공부했습니다. 🙋‍♀️

코드를 그대로 적기보다는 제가 이해한 바를 토대로 정리한 내용입니다.

### colocated state

**colocation의 원리**는 **코드를 최대한 그것과 연관 있는 곳에 배치하는 것**입니다. 최대한 영향이 가는 부분을 최소화한다는 개념입니다.

만약 state가 최상위 컴포넌트 트리에 있다면, 리액트는 어떤 것이 바뀌었는지 모르므로 모든 컴포넌트에서 dom의 업데이트 여부를 체크해야만 합니다. 하지만 state를 최대한 그것과 연관 있는 컴포넌트로 내린다면 리액트는 체크할 것이 적어집니다.

굳이 global일 필요가 없는 state라면 global redux store나 global context안에 넣지 말고 관련된 컴포넌트에 state를 위치시키는 것이 효과적입니다.

## useMemo와 useCallback

### useCallback

우리는 inline 함수들은 성능에 문제를 초래할 수 있기 때문에 성능 향상을 위해 `useCallback`을 써야 한다고 알고 있습니다. 그러나 항상 `useCallback`이 성능을 향상시킬까요?

**모든 라인의 실행되는 코드들은 비용과 함께합니다.** 즉 자바스크립트는 모든 render에서 함수 정의를 위해 메모리를 할당해야만 하고, 이 말은 `useCallback`이 어떻게 구현되었는지에 따라 함수 정의를 위해 더 많은 메모리를 할당할 수도 있다는 것입니다.

### useMemo

`useMemo`는 `useCallback`과 어떠한 value type에 상관없이 memoization을 적용시킨다는 것을 제외하고는 유사합니다.

### 이러한 hooks는 언제 사용해야 할까요?

**참조 동일성(Referential equality)**

객체가 리액트 함수형 컴포넌트 안에서 생성될 때 제일 마지막에 생성된 객체는 비록 같은 props를 가지더라도 처음 정의된 것과 참조적으로 동일하지 않습니다.

```javascript
function Foo({ bar, baz }) {
  const options = { bar, baz };
  React.useEffect(() => {
    buzz(options);
  }, [options]); // we want this to re-run if bar or baz change
  return <div>foobar</div>;
}
```

`useEffect`는 `options`에 대해서 참조 동일성을 render마다 체크하게 됩니다. 그러나 객체는 매번 새로 생성되므로 `useEffect`가 render마다 불리게 되는 것입니다. 이 문제는 아래와 같이 고칠 수 있습니다.

```javascript
// option 1
function Foo({ bar, baz }) {
  React.useEffect(() => {
    const options = { bar, baz };
    buzz(options);
  }, [bar, baz]); // we want this to re-run if bar or baz change
  return <div>foobar</div>;
}
```

그러나 위 방법은 `bar`나 `baz`가 객체, 배열 혹은 함수일 때는 적용할 수 없습니다. 이것이 바로 `useCallback` 그리고 `useMemo`가 **존재하는 이유**입니다.

```javascript
const CountButton = React.memo(function CountButton({ onClick, count }) {
  return <button onClick={onClick}>{count}</button>;
});
function DualCounter() {
  const [count1, setCount1] = React.useState(0);
  const increment1 = React.useCallback(() => setCount1(c => c + 1), []);
  const [count2, setCount2] = React.useState(0);
  const increment2 = React.useCallback(() => setCount2(c => c + 1), []);
  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
    </>
  );
}
```

위 코드에서 첫 번째 CountButton을 클릭하면 두 번째 CountButton을 아무것도 바뀌지 않아도 re-render 됩니다. 이러한 **불필요한 re-render를 막기 위해** `useMemo`와 `useCallback`을 사용하게 되면 성능 향상에 효과적입니다.

**복잡한 계산(Computationally expensive calculations)**

`useMemo`는 다음과 같은 경우에도 효과적입니다. 같은 값을 매 render마다 계산할 필요 없이 `useMemo`에 의해 리액트는 값이 필요할 때만 함수를 부르게 됩니다.

```javascript
function RenderPrimes({ iterations, multiplier }) {
  const primes = React.useMemo(() => calculatePrimes(iterations, multiplier), [
    iterations,
    multiplier,
  ]);
  return <div>Primes! {primes}</div>;
}
```
