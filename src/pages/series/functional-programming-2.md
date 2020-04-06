---
type: 'series'
topic: '함수형 프로그래밍 공부하기'
title: '함수형 프로그래밍'
date: '2020-01-12'
tags: ['JavaScript', 'Functional-Programming']
---

## 다형성

아래는 함수형 프로그래밍으로 전환한 `_map` 함수입니다.

```javascript
function _map(iter, mapper) {
  let result = [];
  for (let i = 0; i < iter.length; i++) {
    result.push(mapper(iter[i]));
  }
  return result;
}

// method, 데이터가 먼저
[1, 2, 3, 4].map((num) => num * 2);
// function, 함수가 먼저
_map([1, 2, 3, 4], (num) => num * 2);
```

ES6에서 추가된 Array 내장 객체의 `map` 메서드와 무엇이 다를까요?

메서드란 객제지향 프로그래밍에서 **객체 내에 정의된 함수**입니다. 이는 메서드가 순수 함수가 아니며 **객체 상태에 따라 결과가 달라짐**을 의미합니다. 또한 메서드는 해당 **객체의 인스턴스 내에서만 사용이 가능**합니다. 즉, Array 객체의 `map` 메서드는 Array-Like 객체에서는 사용할 수 없습니다.

하지만 함수형 프로그래밍적으로 정의된 `_map` 함수에서는 Array-Like 객체 또한 사용이 가능합니다. 객체를 정의하기 이전에 함수를 정의하기 때문입니다. 이러한 이유 때문에 보다 다형성이 높게 프로그래밍을 할 수 있습니다.

### Iteration 프로토콜들

ES6에서는 새로운 문법이나 built-in 뿐만이 아니라, 여러 개의 프로토콜들도 추가되었습니다. **Iterable 프로토콜**과 **Iterator 프로토콜**도 그 중 하나입니다.

두 프로토콜에 따라 `Symbol.iterator` 메서드를 구현한 자바스크립트 객체는 **반복 가능한 객체**입니다. 반복 가능한 객체는 `for...of`와 같이 ES6에서 추가된 명령문으로 반복이 가능합니다.

어떠한 객체라도 프로토콜의 규칙에 따라 `Symbol.iterator`를 정의하면 반복이 가능하므로, 다형성이 높아지게 됩니다. 😊

아래는 `_map` 함수를 `for...of` 명령문으로 다시 정의해 보고, `user`라는 사용자 정의 객체에 `Symbol.iterator` 메서드를 구현하여 반복 가능한 객체로 만든 예시입니다.

이제 `_map` 함수는 반복 가능한 객체라면 무엇이든 반복할 수 있게 되었고, `user` 객체는 반복문에 매개 변수로 사용할 수 있게 되었습니다. 보다 다형성이 높아지지 않았나요? 🧙‍♀️

```javascript
function _map(iter, mapper) {
  let result = [];
  for (const value of iter) {
    result.push(mapper(value));
  }
  return result;
}

const user = {
  name: 'wizvee',
  age: 31,
  [Symbol.iterator]() {
    const entries = Object.entries(this);
    let i = 0;
    return {
      next() {
        return i < entries.length
          ? { value: entries[i++], done: false }
          : { done: true };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

console.log(_map(user, (o) => o));
// [ [ 'name', 'wizvee' ], [ 'age', 31 ] ]
```

### 콜백 함수

**콜백 함수**란 인수로써 다른 함수에 전달된 함수로, 외부 함수 내에서 호출되어 일종의 루틴이나 액션을 완료하는 함수입니다. 함수형 프로그래밍에서는 이러한 콜백 함수, 즉 보조 함수가 어떠한 역할을 하느냐에 따라 다양한 이름을 가지게 됩니다.

- **predi(predicate)**: 어떠한 조건을 반환할 때
- **iter(iteratee)**: 순환하며 반복적으로 실행할 때
- **mapper**: 값을 매핑할 때

함수형 프로그래밍에서는 보조 함수를 통해 내부 다형성을 구현합니다. 상황과 값에 따라 적절한 보조 함수를 인수로 활용함으로써 다형성을 높일 수 있습니다.

## Currying Pattern

**커링**은 불변 데이터와 순수 함수를 이용하여 보통 부수 효과로 알려진 프로그램의 상태 변화를 최소화하는 프로그래밍 패턴으로, 함수형 프로그래밍에서 중요한 도구입니다. 커링은 여러 개의 인수가 있는 함수를 가져와 하나의 인수를 취하는 함수들을 차례대로 반환하다가 결국 값을 도출하는 방식입니다.

자바스크립트에서는 커링이 지원되지 않지만, 일급 함수 등을 통하여 커링과 같은 기법을 구현할 수 있습니다.

```javascript
function _curry(fn) {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(a, b);
  };
}

const add = _curry((x, y) => x + y);
console.log(add(10)(5)); // 15
```

함수형 프로그래밍에서 함수명 뒤에 r이 붙으면, 취한 인수들의 순서를 바꾸어 값을 도출하는 함수가 됩니다.

```javascript
function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(b, a);
  };
}

const sub10 = _curryr((x, y) => x - y)(10);
console.log(sub10(5)); // -5
```

위에서 정의한 `_map` 함수를 보다 간결하게 이용하기 위하여, 커링을 활용해 `_get` 함수를 정의할 수 있습니다.

```javascript
let _get = _curryr((obj, key) => (obj == null ? undefined : obj[key]));

const users = [
  { id: 1, name: 'AA', age: 30 },
  { id: 2, name: 'BB', age: 20 },
];

console.log(_map(users, _get('name')));
// _get('name')이 mapper로써
// _get('name')(list[i])로 호출됨
```

### Pipe function

`pipe` 함수는 인수로 받은 모든 함수를 차례로 실행시키는 함수입니다. `go` 함수는 `pipe` 함수를 즉시 실행합니다. 두 함수로 보다 함수형 프로그래밍에 맞게 코드를 작성하면 다음과 같습니다.

```javascript
function _pipe() {
  const fns = arguments;
  return (arg) => _reduce(fns, (arg, fn) => fn(arg), arg);
}

function _go(arg) {
  const fns = Array.prototype.slice.call(arguments, 1);
  return _pipe.apply(null, fns)(arg);
}

const _map1 = _curryr(_map);
const _filter1 = _curryf(_filter);

_go(
  users,
  _filter1((user) => user.age > 25),
  _map1(_get('name')),
  console.log,
); // ["AA"]
```

### Exception

함수형 프로그래밍에서는 예외 처리를 위하여 `typeof` 연산자나 `try...catch` 구문을 사용하는 등의 방식을 선호하지 않습니다. 다음은 `_each` 함수를 개선하여 `nullish` 값일 때에도 에러가 나지 않도록 개선하는 코드입니다.

```javascript
function _is_object(obj) {
  return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

function _each(list, iter) {
  const keys = _keys(list);
  for (let i = 0; i < keys.length; i++) {
    iter(list[keys[i]]);
  }
  return list;
}

_each(
  {
    13: 'ID',
    19: 'AS',
    44: 'YD',
  },
  (name) => console.log(name.toLowerCase()),
); // ["id", "as", "yd"]
```

이렇듯 함수형 프로그래밍에서는 예외 처리를 통하여 다형성을 높혀, 함수를 연속적으로 실행하는 것에 무리가 없도록 프로그래밍합니다.
