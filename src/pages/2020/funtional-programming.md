---
# type: "post"
title: '함수형 프로그래밍 공부하기'
date: '2020-01-02'
tags: ['JavaScript']
---

해당 포스팅은 [자바스크립트로 알아보는 함수형 프로그래밍](https://www.inflearn.com/course/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D#description) 및 [So You Want to be a Functional Programmer](https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-1-1f15e387e536)을 참고하여 함수형 프로그래밍을 공부하며 정리한 내용입니다. 😊

## Functional Programming

모든 프로그래밍 패러다임은 성공적인 프로그래밍, 즉 좋은 프로그램을 만들기 위해 존재합니다. 좋은 프로그램이란 사용성, 성능, 확장성 그리고 기획 변경에 대한 대응력이 좋은 프로그램을 말합니다.

함수형 프로그래밍은 이러한 성공적인 프로그래밍을 위해 부수 효과 side effects를 제한하고, 함수의 응용을 강조하는 프로그램 패러다임입니다.

부수 효과를 제한한다는 것은 **순수 함수**를 만든다는 의미입니다. 이는 프로그램의 오류를 줄이고 안정성을 높입니다.

함수의 응용, 즉 조합성을 강조한다는 것은 **모듈화 수준을 높인다**는 의미입니다. 이는 프로그램의 재사용성 및 생상성을 높입니다.

```javascript
// 데이터(객체) 기준
// 데이터 디자인 -> 메서드 디자인
duck.moveLeft();
duck.moveRight();
dog.moveLeft();
dog.moveRight();

// 함수 기준
// 함수 디자인 -> 데이터 디자인
moveLeft(duck);
moveRight(dog);
moveLeft({ x: 5, y: 2 });
moveRight(duck);
```

### Pure Functions

**순수 함수**란 매우 간단한 함수입니다.

1. 순수 함수는 오로지 **자신의 매개 변수만을 다루는** 함수입니다.
2. 순수 함수는 같은 매개 변수가 입력되었을 때 **언제나 같은 결과를 반환**합니다.
3. 순수 함수는 **부수 효과를 가지지 않습니다.**

여기서 부수 효과 side effects란, 함수를 호출했을 때 파일이나 DB가 변경되거나 서버로부터 데이터를 받아오는 등의 효과를 의미합니다. 이러한 부수 효과는 사용자가 함수에서 반환되는 결과를 예측하지 못하도록 합니다.

자바스크립트, 자바 그리고 C# 같은 명령형 프로그래밍 언어들에서는 부수 효과가 어디에나 있습니다. 이는 프로그램 내에서 변수가 어디에서든 변할 수 있기 때문에 디버깅을 어렵게 만듭니다.

그렇지만 순수 함수들만으로 프로그래밍이 가능할까요?

함수형 프로그래밍에서 순수 함수들만 사용하는 것은 아닙니다. 함수형 프로그래밍은 부수 효과를 제거할 수 없으며, 단지 제한할 뿐입니다.

아래는 순수 함수의 예시입니다.

```javascript
let z = 10;
// pure function
function add(x, y) {
  return x + y;
}
// NOT pure function 1
function add2(x, y) {
  return x + y + z;
}

let obj1 = {
  val: 10,
};
// pure function
function add3(obj, num) {
  return {
    val: obj.val + num,
  };
}
// NOT pure function
function add4(abj, num) {
  obj.val += num;
}
```

### First-class Function

함수를 다른 변수와 동일하게 다루는 언어는 **일급 함수**를 가졌다고 표현합니다. 예를 들어, 일급 함수를 가진 언어에서는 함수를 다른 함수에 매개변수로 제공하거나, 함수가 함수를 반환할 수 있으며, 변수에도 할당할 수 있습니다.

```javascript
// 함수를 변수에 할당
let f1 = function add(x, y) {
  return x + y;
};
// 함수를 인자로 전달
function f2(f) {
  return f();
}

// 일급 함수를 잘 나타내는 예제
function add_maker(x) {
  return function(b) {
    return a + b;
  };
}

const add10 = add_maker(10);
console.log(add10(20));
// 이름 그대로 함수 생성기,
// closure 개념
```

### Immutability

**함수형 프로그래밍에는 변수가 없습니다.** 관습에 의해 저장된 값들은 여전히 변수라고 불리긴 하지만, 이들은 모두 상수입니다.

함수형 프로그래밍은 값이 변경된 레코드 사본을 작성하여 레코드의 값 변경을 처리합니다. 이를 가능하게 하는 데이터 구조를 사용하여 레코드의 모든 부분을 복사하지 않고도 효율적으로 수행합니다.

그리고 loops를 가지지 않습니다. 이는 loops를 할 수 없다는 것이 아니라, 특정한 loop 구조가 없다는 말입니다.

다음은 이에 대한 예시입니다.

```javascript
function sumRange(start, end, acc) {
  if (start > end) return acc;
  return sumRange(start + 1, end, acc);
}

console.log(sumRange(1, 10, 0)); // 55
```

### Ploymorphism

아래는 함수형 프로그래밍으로 전환한 `map` 함수입니다.

```javascript
function _map(list, mapper) {
  let new_list = [];
  for (let i = 0; i < list.length; i++) {
    new_list.push(mapper(list[i]));
  }
  return new_list;
}

[1, 2, 3, 4].map(num => num * 2); // method: 데이터가 먼저
_map([1, 2, 3, 4], num => num * 2); // function: 함수가 먼저
```

ES6에서 추가된 Array 내장 객체의 `map` 메서드와 무엇이 다를까요?

**메서드**는 **객제지향 프로그래밍에서 객체 내에 정의된 함수**입니다. 이는 메서드가 순수 함수가 아니며 객체 상태에 따라 결과가 달라짐을 의미합니다. 또한 메서드는 해당 객체의 인스턴스 내에서만 사용이 가능합니다. 즉, Array 객체의 `map` 메서드는 Array-Like 객체에서는 사용할 수 없습니다.

하지만 함수형 프로그래밍적으로 정의된 `_map` 함수에서는 Array-Like 객체 또한 사용이 가능합니다. 객체를 정의하기 이전에 함수를 정의하기 때문입니다. 이러한 이유 때문에 보다 다형성이 높게 프로그래밍을 할 수 있습니다.

```javascript
function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
}

function _filter(list, predi) {
  let new_list = [];
  _each(list, val => {
    if (predi(val)) new_list.push(val);
  });
  return new_list;
}
```

**콜백 함수**란 인수로써 다른 함수에 전달된 함수로, 외부 함수 내에서 호출되어 일종의 루틴이나 액션을 완료하는 함수입니다. 함수형 프로그래밍에서는 이러한 콜백 함수, 즉 보조 함수가 어떠한 역할을 하느냐에 따라 다양한 이름을 가지게 됩니다.

- `predi(predicate)`: 어떠한 조건을 반활할 때
- `iter(iteratee)`: 순환하며 반복적으로 실행할 때
- `mapper`: 값을 매핑할 때

함수형 프로그래밍에서는 보조 함수를 통해 내부 다형성을 구현합니다. 상황과 값에 따라 적절한 보조 함수를 인수로 활용함으로써 다형성을 높일 수 있습니다.

### Currying Pattern

**커링**은 불변 데이터와 순수 함수를 이용하여 보통 부수 효과로 알려진 프로그램의 상태 변화를 최소화하는 프로그래밍 패턴으로, 함수형 프로그래밍에서 중요한 도구입니다. 커링은 여러 개의 인수가 있는 함수를 가져와 하나의 인수를 취하는 함수들을 차례대로 반환하다가 결국 값을 도출하는 방식입니다.

자바스크립트에서는 커링이 지원되지 않지만, 일급 함수 등을 통하여 커링과 같은 기법을 구현할 수 있습니다.

```javascript
function _curry(fn) {
  return function(a, b) {
    return arguments.length === 2 ? fn(a, b) : b => fn(a, b);
  };
}

const add = _curry((x, y) => x + y);
console.log(add(10)(5)); // 15
```

함수형 프로그래밍에서 함수명 뒤에 r이 붙으면, 취한 인수들의 순서를 바꾸어 값을 도출하는 함수가 됩니다.

```javascript
function _curryr(fn) {
  return function(a, b) {
    return arguments.length === 2 ? fn(a, b) : b => fn(b, a);
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
  return _reduce(fns, (arg, fn) => fn(arg), arg);
}

function _go(arg) {
  const fns = Array.prototype.slice.call(arguments, 1);
  return _pipe.apply(null, fns)(arg);
}

const _map1 = _curryr(_map);
const _filter1 = _curryf(_filter);

_go(
  users,
  _filter1(user => user.age > 25),
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
  name => console.log(name.toLowerCase()),
); // ["id", "as", "yd"]
```

이렇듯 함수형 프로그래밍에서는 예외 처리를 통하여 다형성을 높혀, 함수를 연속적으로 실행하는 것에 무리가 없도록 프로그래밍합니다.

## 컬렉션 중심 프로그래밍

## 자바스크립트에서의 지연 평가

## 실전코드조각

## 비동기

이슈1.
functional progamming에서 decorator
object-oriented programming에서 decorator
뭔 차이일까? [링크](https://medium.com/qualyteam-engineering/decorator-design-pattern-in-functional-and-object-oriented-programming-e0a2be3c5679)

functional programming과 decorator 설명이 상당히 유사한 거 아닐까?
함수를 인자로 받는 함수? Java에서 annotation과 확연히 다른.

reduce는 iter 보조 함수를 재귀적으로 호출하여 축약해가는 함수.
