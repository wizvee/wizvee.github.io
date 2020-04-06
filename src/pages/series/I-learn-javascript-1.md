---
type: 'series'
topic: 'JavaScript 이해하기'
title: 'Runtime & Event Loop'
date: '2020-01-09'
tags: ['JavaScript']
---

## JavaScript

아래 내용은 전반적으로 자바스크립트가 동작되는 원리를 이해하기 위해 공부한 내용을 정리한 것입니다. 공부 시에는 다음의 자료들을 참고하였습니다. 😊 양질의 자료를 공유해 주시는 선배 개발자분들께 언제나 감사드립니다.

- [Javascript Runtime의 구조](http://jaynewho.com/post/25)
- [자바스크립트와 이벤트 루프](https://meetup.toast.com/posts/89)
- [JavaScript의 Event Loop](https://asfirstalways.tistory.com/362)

### Single thread

자바스크립트는 **싱글 스레드** 기반의 언어입니다. 싱글 스레드란, 말 그대로 프로세스 내에서 실행되는 흐름의 단위가 하나라는 뜻입니다. 프로세스와 스레드에 대해 간략히 정리하자면 다음과 같습니다.

- **프로세스**는 운영체제에서 할당하는 작업의 단위입니다. 노드나 브라우저 같은 프로그램은 개별적인 프로세스입니다. 프로세스 간에는 메모리 등의 자원을 공유하지 않습니다. 다만 두 프로세스가 대화할 필요가 있다면 프로세스 간 통신(Inter Process Communication)을 사용할 수 있습니다.

- **스레드**는 프로세스 내에서 실행되는 흐름의 단위입니다. 하나의 프로세스는 스레드를 여러 개 가질 수 있습니다. 스레드들은 부모 프로세스의 자원을 공유합니다. 즉, 같은 메모리에 접근할 수 있습니다.

즉 싱글 스레드 기반이란, 한 번에 단 하나의 작업만을 처리할 수 있다는 뜻입니다.

### Runtime concepts

자바스크립트 실행환경(runtime)은 크게 4가지 요소로 나눌 수 있습니다.

1. JavaScript Engine
2. Background
3. Task Queues
4. Event Loop

#### JavaScript Engine

대표적인 자바스크립트 실행환경인 브라우저는 크게 렌더링 엔진과 자바스크립트 엔진으로 나뉩니다. 이중 자바스크립트 엔진은 자바스크립트 코드를 해석하고 실행하는 인터프리터입니다. 자바스크립트 엔진은 호출 스택과 메모리 힙으로 구성됩니다.

- **Call Stack**: 자바스크립트 엔진은 단일 호출 스택을 사용합니다. 요청이 들어올 때마다 해당 요청을 순차적으로 호출 스택에 담아 처리합니다. 이러한 방식을 **Run-to-completion**이라 합니다. 이는 하나의 함수가 실행되면 해당 함수의 실행이 끝날 때까지는 다른 어떠한 작업도 중간에 끼어들지 못한다는 의미입니다.

- **Memory Heap**: 객체들은 힙 안에 할당됩니다. 이는 구조화되지 않은 넓은 메모리 영역을 지칭합니다.

#### Background

자바스크립트 엔진에서 코드를 해석하고 실행하다가 다음과 같은 백그라운드 API를 호출하게 되면, 백그라운드 작업이 시작됩니다. 백그라운드는 수많은 작업을 하는 **멀티 스레드**입니다. 즉 자바스크립트가 단일 스레드 기반의 언어라는 말은 자바스크립트 엔진이 단일 호출 스택을 사용함을 의미하는 것이며, 자바스크립트가 구동되는 실행환경에서는 여러 개의 스레드가 사용됩니다.

1. Timer 작업(`setTimeout` 등으로 호출)
2. eventListener 작업(`onClick` 등으로 호출)
3. Promise

각 백그라운드 작업을 마치게 되면, API가 호출될 때 전달받은 콜백 함수를 태스크 큐에 삽입하기 위해 이벤트 루프에 전달하게 됩니다.

#### Task Queues

이벤트 발생 후 호출되어야 할 콜백 함수들이 기다리는 공간입니다. 자바스크립트 엔진의 호출 스택이 비게 되면 대기열에 들어온 순서대로 콜백 함수들이 실행되게 됩니다.

자바스크립트에서 **비동기로 호출되는 함수들은 호출 스택에 쌓이지 않고 태스크 큐에 추가**됩니다. 자바스크립트 엔진이 아닌 백그라운드 API에 따로 정의된 함수를 호출할 경우 비동기로 실행되게 됩니다.

#### Event loop

**이벤트 루프(Event loop)**는 이벤트 발생 시 호출할 콜백 함수들을 관리하고, 호출된 콜백 함수의 실행 순서를 결정하는 역할을 담당합니다. 무한 루프를 돌면서 콜백 함수를 백그라운드에서 태스크 큐로, 태스크 큐에서 호출 스택으로 전달합니다.

### Call async functions

위에서 비동기로 호출되는 함수들은 호출 스택에 쌓이지 않고 태스크 큐에 추가된다고 했습니다. 아래는 이에 대한 예시입니다.

```javascript
function test1() {
  console.log('test1');
  test2();
}

function test2() {
  const log = () => console.log('test2');
  setTimeout(log, 0);
  test3();
}

function test3() {
  console.log('test3');
}

test1();
// test1
// test3
// test2
```

`setTimeout` 함수의 콜백 함수인 `test2`는 호출 스택에서 바로 실행되지 않고 태스크 큐에 추가됩니다. 때문에 `test3` 함수가 먼저 실행되는 것입니다.

프런트엔드 환경의 자바스크립트 코드를 보다보면 위에서 쓰인 `setTimeout(fn, 0)`와 같은 코드를 종종 목격하게 됩니다. 직관적으로 이해하기 힘든 코드이지만, 실제로는 그냥 `fn`을 호출하는 것과는 상당히 다른 결과를 가져옵니다.

브라우저에서는 자바스크립트 엔진뿐만 아니라 다른 여러 가지 프로세스가 함께 구동되고 있습니다. 렌더링 엔진 또한 그 중의 일부이며, **렌더링 엔진의 태스크는 자바스크립트 엔진과 동일한 단일 태스크 큐를 통해 관리됩니다.** 이로 인해 가끔 예상치 못한 문제가 생길 수도 있습니다.

```javascript
$('.btn').click(function() {
  showLoading();
  longTakingProcess();
  hideLoading();
  showResult();
});
```

`longTakingProcess`가 너무 오래 걸리는 작업이기 때문에 `showLoading`을 호출해서 로딩 메시지를 보여주려고 합니다. 하지만 실제로 코드를 실행해보면 화면에 로딩 메시지가 표시되지 않습니다. 그 이유는 `showLoading` 함수의 실행이 끝나고 렌더링 엔진이 렌더링 요청을 보내도 해당 요청은 **태스크 큐에 추가되어, 호출 스택이 비기를 기다리고 있기 때문**입니다. 그러나 호출 스택이 비는 시점에는 이미 `showResult`까지 실행이 끝났을 것이고, 결국 렌더링되는 시점에는 `hideLoading`으로 인해 로딩 메시지가 숨겨진 상태일 것입니다.

이를 해결하기 위해 `setTimeout(fn, 0)`을 활용할 수 있습니다.

```javascript
$('.btn').click(function() {
  showLoading();
  setTimeout(function() {
    longTakingProcess();
    hideLoading();
    showResult();
  }, 0);
});
```

이 경우에는 `longTakingProcess`가 바로 실행되지 않고 태스크 큐에 추가될 것입니다. 하지만 이전에 `showLoading`으로 인해 렌더링 요청이 먼저 태스크 큐에 추가되었기 때문에, 이벤트 루프는 렌더링 요청을 먼저 처리하게 되고 로딩 메시지는 화면에 보여지게 되는 것입니다.

### Promise

```javascript
setTimeout(function() {
  console.log('A');
}, 0);

Promise.resolve()
  .then(function() {
    console.log('B');
  })
  .then(function() {
    console.log('C');
  });

// B
// C
// A
```

위 예제는 어떻게 동작한 것일까요? 프로미스도 백그라운드 API니 태스크 큐에 추가되어 순서대로 실행돼야 하지 않았을까요? 이는 **프로미스로부터 전달된 콜백 함수는 별도의 마이크로 태스크 큐(micro task queue)에 쌓이고, 이벤트 루프는 호출 스택이 비었을 때 태스크 큐보다 우선적으로 마이크로 태스크 큐를 수행하기 때문**입니다.

실재로 태스크가 마이크로 태스크냐 일반 태스크냐에 따라 실행되는 타이밍이 달라지기 때문에 둘을 제대로 이해하고 구분해서 사용하는 것이 중요합니다. 예를 들어 마이크로 태스크가 계속돼서 실행될 경우 일반 태스크인 UI 렌더링이 지연되는 현상이 발생할 수도 있을 것입니다.

### Variable Hoisting

**호이스팅**이란 `var` 선언문이나 `function` 선언문 등 모든 선언문이 해당 `scope`의 선두로 옮겨진 것처럼 동작하는 특성을 말합니다.

변수는 3단계에 걸쳐 생성됩니다.

1. **선언** 단계(Declaration phase): 변수 객체에 변수를 등록합니다. 이 변수 객체는 스코프가 참조하는 대상이 됩니다.

2. **초기화** 단계(Initialization phase): 변수 객체에 등록된 변수를 메모리에 할당합니다. 이 단계에서 변수는 `undefined`로 초기화됩니다.

3. **할당** 단계(Assignment phase): `undefined`로 초기화된 변수에 실제 값을 할당합니다.

`var` 키워드로 선언된 변수는 선언 단계와 초기화 단계가 한번에 이루어집니다. 따라서 변수 선언문 이전에 변수에 접근해도 변수 객체에 변수가 존재하기 때문에 에러가 발생하지 않으며, 다만 `undefined`를 반환하게 됩니다.

그러나 `let`이나 `const` 키워드로 선언한 변수는 선언 단계 후 **초기화되지 않습니다.** 따라서 변수 선언문 이전에 변수에 접근하게 되면, `ReferenceError`가 발생하게 됩니다.

```javascript
function introduce() {
  console.log(name);
  console.log(age);

  var name = 'Wizvee';
  let age = 31;
}

introduce();
// undefined
// Uncaught ReferenceError
```