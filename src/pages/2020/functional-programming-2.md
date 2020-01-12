---
# type: 'post'
title: '함수형 프로그래밍 공부하기2'
date: '2020-01-12'
tags: ['JavaScript', 'Functional-Programming']
---

## 컬렉션 중심 프로그래밍

컴퓨터 과학에서 컬렉션이란, 단순히 여러 요소를 단일 단위로 그룹화하는 객체입니다. 보편적으로 프로그래밍 언어에서 컬렉션이라고 하면 Array나 List, Map 등의 개념을 일컫습니다.

함수형 프로그래밍은 여러 기능을 한꺼번에 수행하는 함수보다는, **각각의 기능을 가진 여러 함수를 만드는 것에 중점**을 두는 프로그래밍 패러다임입니다. 컬렉션 프로그래밍이 이에 대한 사례이며 때문에 함수형 프로그래밍 또한 컬렉션 중심 프로그래밍입니다. `map`, `filter` 등의 함수가 대표적인 컬렉션 중심 프로그래밍 함수들입니다.

컬렉션 중심 프로그래밍 함수들은 대표적으로 아래와 같이 4가지 유형으로 나뉩니다. 그리고 각 유형에는 대표 함수이자 특화 함수가 있습니다. 대표 함수는 각 유형에서 추상화 레벨이 가장 높은 함수입니다. 때문에 대표 함수로부터 각 유형의 모든 함수를 만들 수 있습니다.

### 수집하기

`map` 함수가 대표적입니다. 특화 함수에는 `values`, `pluck` 함수 등이 있습니다.

위에서 구현한 `_each` 함수를 활용해 `_map` 함수를 다시 정의해보자면 다음의 예시와 같습니다.

```javascript
function _map(list, mapper) {
  let new_list = [];
  _each(list, val => new_list.push(mapper(val)));
  return new_list;
}
const _map1 = curryr(_map);
// 위에서 작성한 curry pattern
```

`_each` 함수에서 다형성을 높혔기 때문에 `_map` 함수 또한 다형성이 높은 함수입니다. Array 객체뿐 아니라 Array-like 객체, 일반 객체 등도 인수로 넣을 수 있습니다.

아래는 `_map`함수를 이용해 나머지 수집하기 특화 함수를 구현한 예제입니다.

```javascript
function _identity(val) {
  return val;
}

// values는 data의 각 key에 대한 value를
// 반환하는 함수
const _values = _map1(_identity);
console.log(_values(users[0]));
// { id: 1, name: 'AA', age: 30 }

// pluck는 data에서 key에 해당하는 value를
// 반환하는 함수
function _pluck(data, key) {
  return _map(data, _get(key));
}
console.log(_pluck(users, 'age'));
// [30, 20]
```

### 거르기

`filter` 함수가 대표 함수입니다. 특화 함수에는 `reject`, `compact` 그리고 `without` 등의 함수가 있습니다.

```javascript
function _filter(list, predi) {
  let new_list = [];
  _each(list, val => predi(val) && new_list.push(val));
  return val;
}

function _negate(func) {
  return function(val) {
    return !func(val);
  };
}

// reject는 말 그대로 predi 보조 함수 조건에
// 일치하지 않는 값들을 반환하는 함수
function _reject(data, predi) {
  return _filter(data, _reject(predi));
}
console.log(users, user => user.age > 30);
// { id: 2, name: 'BB', age: 20 }

// compact는 data에서 truthy한 값만 반환하는 함수
function _compact(data) {
  return _filter(data, _identity);
}
console.log(_compact([1, 2, 0, null, undefined, {}]));
// [1, 2, {}]
```

처음 `_identity` 함수를 볼 때, '도대체 뭐에 쓰는 함수일까?' 생각했었는데요.

3. 찾아내기: `find`, `some`, `every` 등
4. 접기: `reduce`, `min`, `max`, `group_by`, `count_by` 등

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
