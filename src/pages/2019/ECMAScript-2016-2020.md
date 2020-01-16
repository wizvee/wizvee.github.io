---
type: 'post'
title: 'ES2016부터 ES2020까지 기능 살펴보기'
date: '2019-12-19'
tags: ['JavaScript']
---

자바스크립트의 표준을 정의하는 **ECMAScript**. ES2015에서 자바스크립트는 엄청난 변화를 맞이했었는데요. 지금까지 리액트와 뷰를 다루면서 ES2015에는 어느 정도 익숙해졌지만, ES2016부터 추가된 기능들에 대해서는 모르는 부분이 많더라고요. 😢

그래서 이번 기회에! **ES2016부터 ES2019까지** 추가된 기능을 공부하고자 합니다. 👩‍💻

해당 포스팅은 [examples of everything new in ES2016, 2017 and 2018](https://www.freecodecamp.org/news/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e/)을 참고하여 작성되었습니다.

## ES2016

### Array.prototype.includes

`includes`는 배열에 특정한 데이터가 포함되어 있는지 여부를 반환합니다. 반환 값은 `Boolean`이에요.

```javascript
const arr = [1, 2, 3, 4, NaN];
console.log(arr.includes(3)); // true
console.log(arr.includes(5)); // false
```

### Exponentiation infix operator

`**`는 제곱근을 반환하는 새로운 연산자입니다. 기존의 `Math.pow()` 메서드와 같은 값을 반환합니다.

```javascript
7 ** 2; //49
```

## ES2017

### Object.values()

`Object.keys()`와 마찬가지로, `Object.values()`는 객체의 전체 value를 배열로 반환합니다.

```javascript
const cars = { BMW: 3, Tesla: 2, KIA: 1 };
console.log(Object.values(cars)); // [3, 2, 1]
```

### Object.entries()

`Object.entries()`는 객체의 [key, value] 쌍의 배열을 반환합니다.

```javascript
const cars = { BMW: 3, Tesla: 2, KIA: 1 };
console.log(Object.entries(cars));
// [Array(2), Array(2), Array(2)]
// ["BMW", 3], 즉 [key, value] 형식
```

### String padding

`String.prototype.padStart`와 `String.prototype.padEnd`는 문자열의 앞과 뒤에 특정한 문자열을 추가합니다. 이때 매개변수로 설정한 목표 문자열 길이만큼 채워집니다.

```javascript
'a'.padStart(5); // '     a'
'a'.padEnd(5, '-'); // '----a'
```

### Object.getOwnPropertyDescriptors

`Object.getOwnPropertyDescriptor()`는 객체 속성에 대한 설명자를 반환합니다.

```javascript
const person = { name: 'wizvee', age: 30 };
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: "wizvee", writable: true, enumerable: true, configurable: true}
```

`Obejct.getOwnPropertyDescriptors()`는 객체의 모든 속성에 대한 설명자를 반환합니다.

### Async/Await

`async function`은 `AsyncFunction`객체를 반환하는 하나의 비동기 함수를 정의합니다. 이때 `async function`은 스스로 `Promis`를 반환합니다.

```javascript
async function getAmount(userId) {
  const user = await getUser(userId);
  const amount = await getBankBalance(userId);
  return `user:${user}, amount:${amount}`;
}

getAmount(1).then(console.log);
```

`Promise.all()`메서드는 순회 가능한 객체에 주어진 모든 프로미스를 이행한 후, 혹은 프로미스가 주어지지 않았을 때 이행하는 `Promise`를 반환합니다.

```javascript
async function doubleAndAdd(a, b) {
  [a, b] = await Promise.all([doubleAfter1Sec(a), doubleAfter1Sec(b)]);
  return a + b;
}
doubleAndAdd(1, 2).then(console.log);

function doubleAfter1Sec(param) {
  return new Promise(resolve => setTimeout(resolve(param * 2), 1000));
}
```

## ES2018

### Promise.prototype.finally

`Promise.prototype.finally()`는 Promise가 처리되면 충족되거나(resolve) 거부되는지(reject) 여부에 관계없이 지정된 콜백 함수가 실행됩니다.

`finally()` 메서드로 `then()`과 `catch()` 핸들러에서의 코드 중복을 피할 수 있습니다.

```javascript
let myPromise = new Promise(function(resolve, reject) {
  throw new Error('something happend');
})
  .then(val => console.log(val))
  .catch(e => console.log(e))
  .finally(() => console.log('This function is always executed!'));
```

### For-Await-Of

이제 `await`에 `for`를 사용할 수 있습니다.

```javascript
const promises = [
  new Promise(resolve => resolve(1)),
  new Promise(resolve => resolve(2)),
  new Promise(resolve => resolve(3)),
];

async function test() {
  for await (const obj of promises) console.log(obj);
}
```

아래 내용부터는 Naver D2의 [2019년과 이후 JavaScript의 동향](https://d2.naver.com/helloworld/4007447)을 참고하여 공부하고 정리한 내용입니다.

## ES2019

### Array.prototype.flat

`Array.prototype.flat()`메서드는 중첩된 배열 구조를 평평하게 만듭니다. 또한 배열의 빈 슬롯도 제거합니다.

```javascript
let arr = [1, 2, [3, 4, [5, 6]]];
arr.flat(); // [1, 2, 3, 4, [5, 6]]
arr.flat(2); // [1, 2, 3, 4, 5, 6]
```

`Array.prototype.flatMap()`메서드는 `flat()`과 `map()`를 병합해 사용해야 할 때 효율적입니다.

### Object.fromEntries

`Object.fromEntries()`메서드는 키값 쌍의 목록을 객체로 바꿉니다.

```javascript
const entries = new Map(['foo', 'bar'], ['baz', 42]);
console.log(Object.fromEntries(entries)); // {foo: "bar", baz: 42}
```

### Symbol.prototype.description

`Symbol`객체의 선택 매개변수인 `description`값을 반환하는 읽기 전용 속성입니다.

```javascript
Symbol('test').description; // test
```

### Optional catch binding

`try-catch`구문에서 `catch`구문에 매개변수가 사용되지 않으면 매개변수를 생략할 수 있습니다.

## 2020

아래 내용부터는 [New JavaScript Features Coming in ES2020 That You Can Use Now](https://levelup.gitconnected.com/new-features-of-javascript-that-we-can-use-soon-or-now-6199981bd2f)을 참고하여 공부하고 정리한 내용입니다.

### Private Fields in Classes

이제 `#` 기호로 private variable를 설정할 수 있습니다. 이제 private variables를 위해 closures를 사용하지 않아도 됩니다.

```javascript
class Sample {
  #x = 0;
}

const s = new Sample();
console.log(s.#x);
// Uncaught SyntaxError: Private field '#x'
```

### Optional Chaining Operator

깊이 중첩된 객체의 property를 검증할 때, 기존에는 긴 boolean 표현식을 사용해야만 했습니다.

이때 `?.`연산자를 사용하면 체인의 각 참조가 유효한지 명시적으로 검증하지 않고, 연결된 객체 체인 내에 깊숙이 위치한 속성 값을 읽을 수 있습니다. `?.`연산자는 `.`연산자와 유사하게 작동하지만, 만약 참조가 nullish라면 에러가 발생하는 대신 `undefined`를 리턴합니다.

```javascript
const obj = {
  prop1: {
    prop2: {
      prop3,
    },
  },
};

// before
const nestedProp1 = obj.prop1 && obj.prop2 && obj.prop3;
// ES2020
const nestedProp2 = obj.prop1?.prop2?.props3;
```

다음과 같은 상황에서 `?.`연산자가 유용하게 사용됩니다.

```javascript
// optional callbacks과 event handler 다루기
function doSomething(onContent, onError) {
  try {
    // ... do something with the data
  } catch (err) {
    onError?.(err.message);
    // no exception if onError is undefined
  }
}

// Optional chaining with expressions
const nestedProp3 = obj?.['prop' + 'Name'];
// Array Item access with optional chaining
const arrItem = arr?.[42];
```

### Nullish Coalescing Operator

변수가 `null` 또는 `undefined`인 경우 변수를 설정하기 위해 기본값을 만들어야 할 수 있습니다.

`??`연산자는 왼쪽 피연산자가 `null` 또는 `nudefined`일 때 오른쪽 피연산자를 반환하고, 그렇지 않으면 왼쪽 피연산자를 반환합니다.

```javascript
// before
const y1 = x || 500;

// ES2020
const y2 = x ?? 500;
```

하지만 `??`연산자는 `||`연산자와는 달리 **falsy**값을 거르지 않으므로 이를 주의해야 합니다.

### BigInt

`BigInt`는 `Number` 원시 값이 안정적으로 나타낼 수 있는 최대치인 2의 53승보다 큰 정수를 표현할 수 있는 내장 객체입니다.

```javascript
const huge = BigInt(9007199254740991);
```
