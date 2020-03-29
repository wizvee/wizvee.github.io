---
type: 'series'
topic: 'JavaScript 이해하기'
title: 'arguments & this'
date: '2020-03-22'
tags: ['JavaScript']
---

## this 키워드

자바스크립트 함수 내에서 `this` 키워드는 다른 언어와 조금 다르게 동작합니다. 또한 **엄격 모드**와 **비엄격 모드**에서도 차이를 보입니다. 대부분의 경우 `this`의 값은 **함수를 어떻게 호출했느냐**에 따라 결정됩니다.

### 1. 함수 호출

**전역 객체(global object)**는 모든 객체의 유일한 최상위 객체를 의미합니다. browser-side에서는 `window`를, server-side에서는 `global`을 가리킵니다.

기본적으로 `this` 키워드는 **전역 객체를 참조**합니다. **전역 문맥과 전역 함수는 물론이고 내부 함수의 경우에도 동일**합니다.

```javascript
// 전역 문맥의 this
this === window; // true

// 전역 함수 문맥
function f1() {
  return this;
}
f1() === window;
```

**내부 함수**의 `this`는 일반 함수, 메서드, 콜백 함수 등 **선언된 곳과 관계없이 전역 객체를 바인딩**합니다.

```javascript
// 일반 함수의 내부 함수
function f1() {
  console.log(this === window); // true

  function f2() {
    console.log(this === window); // true
  }
}

// 메서드의 내부 함수
var a = 'global';
const o1 = {
  a: 'object',
  getA() {
    console.log(this.a); // object

    function f1() {
      console.log(this.a); // global
    }

    f1();
  },
};

o1.getA();
```

#### 1.1 `call()` & `apply()` 메서드

`Function.prototype`으로부터 상속받는 `call()`과 `apply()` 메서드로 함수를 호출하면 `this`의 값을 특정 객체에 바인딩할 수 있습니다.

```javascript
const o1 = { a: 'object' };
var a = 'global';

function f1() {
  return this.a;
}

f1(); // global

f1.call(o1);
f1.apply(o1);
// object
```

#### 1.2 `bind()` 메서드

ES5에서 `Function.prototype`으로부터 상속받는 `bind()` 메서드를 도입했습니다. `f1.bind(obj)`를 호출하면 `f1`과 같은 코드와 범위를 가졌지만 특정한 객체에 `this`의 값을 바인딩하는 새로운 함수를 반환합니다.

```javascript
const o1 = { a: 'object' };

function f1() {
  return this.a;
}

const g = f.bind(o1);
console.log(g()); // object
```

#### 1.3 화살표 함수

화살표 함수에서 `this`는 자신을 감싼 **정적 범위(lexical context)**입니다. 전역 코드에서는 전역 객체를 가리킵니다.

```javascript
const o1 = {
  a: 10,
  f1: () => this.a,
};

console.log(o1.f1());
// NaN
// this는 전역 객체를 참조
```

### 2. 메서드 호출

함수를 어떤 **객체의 메서드로 호출**하면 `this`의 값은 **그 객체에 바인딩**됩니다.

```javascript
const o1 = {
  a: 'object',
  f1() {
    return this.a;
  },
};

console.log(o1.f1()); // object
```

함수를 `new` 키워드와 함께 생성자로 사용하면 `this`는 새로 생긴 객체에 바인딩됩니다.

```javascript
function O() {
  this.a = 'object';
}

const o1 = new O();
console.log(o1.a); // object
```

### 3. 이벤트 핸들러 호출

함수를 이벤트 핸들러로 사용하면 `this`는 **이벤트를 발생시킨 DOM 요소**에 바인딩됩니다.

```javascript
function bluify(e) {
  this.style.backgroundColor = 'blue';
}
```

코드를 인라인 이벤트 핸들러로 사용하면 `this`는 **핸들러를 배치한 DOM 요소**로 바인딩됩니다.

```html
<button onclick="alert(this.tagName);">
  this 표시
</button>
```
