---
type: 'series'
topic: '함수형 프로그래밍 공부하기'
title: 'FP를 위한 기본기'
date: '2020-01-02'
tags: ['JavaScript', 'Functional-Programming']
---

함수형 프로그래밍은 자료 처리를 수학적 함수의 계산으로 취급하고 상태와 가변 데이터를 멀리하는 프로그래밍 패러다임의 하나입니다. **명령형 프로그래밍**이 **상태를 바꾸는 구문**을 강조한다면, **함수형 프로그래밍**은 **순수 함수(pure functions)**와 **함수의 응용**을 강조합니다.

```javascript
// 데이터 기준
// 데이터 디자인 후 메서드 디자인
duck.moveLeft();
duck.moveRight();
dog.moveLeft();
dog.moveRight();

// 함수 기준
// 함수 디자인 후 데이터 디자인
moveLeft(duck);
moveRight(dog);
moveLeft({ x: 5, y: 2 });
```

## 순수 함수

**순수 함수**란 매우 간단한 함수로, 다음과 같은 특징이 있습니다.

1. 오직 **매개 변수만 사용**합니다.
2. 같은 매개 변수가 입력된다면, **언제나 같은 결과를 반환**합니다.
3. **부수 효과(side effects)를 제한**합니다.

여기서 부수 효과란, 함수를 호출했을 때 파일이나 DB가 변경되거나 서버로부터 데이터를 받아오는 등의 효과를 의미합니다. 이러한 부수 효과는 사용자가 함수에서 반환되는 결과를 예측하지 못하도록 합니다.

자바스크립트, 자바 그리고 C# 같은 명령형 프로그래밍 언어들에서는 부수 효과가 어디에나 있습니다. 이는 프로그램 내에서 변수가 어디에서든 변할 수 있기 때문에 디버깅을 어렵게 만듭니다.

그렇지만 순수 함수들만으로 프로그래밍이 가능할까요?

함수형 프로그래밍에서 순수 함수들만 사용하는 것은 아닙니다. 함수형 프로그래밍은 부수 효과를 제거할 수 없으며, 단지 제한할 뿐입니다.

아래는 순수 함수의 예시입니다.

```javascript
let z = 10;
// 순수 함수
function add(x, y) {
  return x + y;
}
// 순수하지 않은 함수
function add2(x, y) {
  return x + y + z;
}

let o1 = {
  val: 10,
};
// 순수 함수
function plus(obj, num) {
  return {
    val: obj.val + num,
  };
}
// 순수하지 않은 함수
function plus1(obj, num) {
  obj.val += num;
}
```

## 일급 함수 & 고차 함수

함수형 프로그래밍에서, 함수는 **일급 함수(first-class functions)**입니다. 즉, 함수 역시 또 다른 형태의 값일 뿐입니다. 그렇기 때문에 함수를 다른 함수에 매개 변수로 제공하거나, 함수가 함수를 반환할 수 있으며, 변수에도 할당할 수 있습니다.

**고차 함수(higher-order functions)**는 함수를 매개 변수로 받거나, 함수를 결과로 반환하는 함수를 말합니다. 고차 함수를 정의하기 위해서는 함수가 일급 함수여야 하겠죠! 🤝 이렇게 둘은 연관되어 있습니다.

아래는 일급 함수 및 고차 함수의 예시입니다.

```javascript
// 함수를 변수에 할당
let f1 = function add(x, y) {
  return x + y;
};
// 함수를 인자로 전달
function f2(f) {
  return f();
}

// 고차 함수를 잘 나타내는 예제
// 클로저
function add_maker(x) {
  return function(b) {
    return a + b;
  };
}

const add10 = add_maker(10);
console.log(add10(20));
```

## 불변성

**함수형 프로그래밍에는 변수가 없습니다.** 관습적인 이유로 저장된 값들을 여전히 변수라고 부르긴 하지만, 이들은 모두 상수입니다.

함수형 프로그래밍은 값이 변경된 레코드 사본을 작성하여 레코드의 값 변경을 처리합니다. 이를 가능하게 하는 데이터 구조를 사용하여 레코드의 모든 부분을 복사하지 않고도 효율적으로 수행합니다.

그렇기 때문에 함수형 프로그래밍에서는 **반복문이 없습니다.** 당연히 반복(loop)을 할 수 없다는 의미는 아니고, 특정한 반복문, 예를 들면 `for`, `while` 등을 사용하지 않는다는 뜻입니다.

다음은 이에 대한 예시입니다.

```javascript
function sumRange(start, end, acc) {
  if (start > end) return acc;
  return sumRange(start + 1, end, acc);
}

console.log(sumRange(1, 10, 0)); // 55
```

## 참고 자료

- [So You Want to be a Functional Programmer](https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-1-1f15e387e536)
