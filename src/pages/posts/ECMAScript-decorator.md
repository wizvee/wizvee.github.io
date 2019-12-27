---
type: "post"
title: "Javascript Decorators"
date: "2019-12-27"
tags: ["JavaScript"]
---

**MobX**를 조금씩 건드리면서, 처음으로 자바스크립트의 **decorator**라는 개념을 알게 되었어요. 처음 든 생각은 '자바에서 annotation과 똑같이 생겼잖아? 🤔 비슷한 건가?'였었는데요. 대충 넘어갔다가 면접 질문으로 나왔을 뿐이고, 대답을 제대로 못했을 뿐이고… 😭 처음 봤을 때 개념을 정리해둘걸, 얼마나 후회했는지 모르겠어요.

늦었지만 이제라도 제대로 개념을 정리해두려고 합니다! 👩‍💻

해당 포스팅은 [JavaScript Decorators: What They Are and When to Use Them](https://www.sitepoint.com/javascript-decorators-what-they-are/) 및 [ES7의 decorator](https://blog-kr.zoyi.co/channel-frontend-decorator/)을 참고하여 공부하고 정리하였습니다. 📚

## What is a Decorator?

간단히 말하자면, decorator는 **코드를 하나로 감싸는 간단한 방법**입니다. 이러한 개념은 우리가 이전에 함수의 합성 [functional composition](https://medium.com/dailyjs/functional-js-6-function-composition-b7042c2ccffa)이나 고차 함수 [higher-order function](https://poiemaweb.com/js-array-higher-order-function)에서 들어본 개념일 수도 있습니다.

아래에 간단한 예제가 있습니다.

```javascript
function doSomething(name) {
  console.log("Hello, " + name);
}

function loggingDecorator(wrapped) {
  return function() {
    console.log("Starting");
    const result = wrapped.apply(this, arguments);
    console.log("Finished");
    return result;
  };
}

const wrapped = loggingDecorator(doSometing);

doSomething("Graham"); // Hello, Graham

wrapped("Graham");
// Starting
// Hello, Graham
// Finished
```

## How to Use JavaScript Decorators

Decorators는 특별한 syntax를 사용합니다. 접두어로 `@` 심볼을 붙여 사용합니다. 또한 원하는 코드 조각에 여러 개의 decorators를 사용할 수도 있으며, 이때는 선언된 순서대로 코드에 적용됩니다.

```javascript
@log()
@immutable()
class Example {
  @time("demo")
  doSometing() {
    //
  }
}
```

## Why Use Decorators?

그동안 함수의 합성은 이미 자바스크립트에서 가능했었습니다. 그렇지만 동일한 techniques를 각각 다른 코드 조각들에 적용하기란 상당히 어렵거나 불가능한 일이었습니다.

Decorators를 사용하면 코드에 wrappers를 적용하기 위한 syntax가 더 깔끔해질 뿐만 아니라, 작성한 의도를 보다 명확히 전달할 수 있습니다.

## Different Types of Decorator

현재 지원되는 유일한 decorator 타입들은 classes와 members of classes입니다. 여기에는 properties, methods, getters 그리고 setters를 포함합니다.

Decorators는 다른 함수를 반환하는 함수들에 지나지 않으며, decorated될 아이템의 적절한 세부사항과 함께 호출됩니다. 이러한 decorator 함수들은 프로그램이 처음 실행될 때 평가되며, decorated된 코드는 반환된 값으로 교체됩니다.

### Class member decorators

Property decorators는 클래스의 단일 멤버에 적용됩니다. properties, methods, getters 또는 setters 중 무엇이든 상관없습니다. 이 decorator는 세 가지 매개변수와 호출됩니다.

- `target`: 멤버가 존재하는 클래스
- `name`: 클래스에서 맴버의 이름
- `descriptor`: [멤버 서술자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

여기 `@readonly`를 간단히 구현한 예제가 있습니다.

```javascript
function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Example {
  a() {}
  @readonly
  b() {}
}

const e = new Example();
e.a = 1;
e.b = 2; // TypeError: Cannot assign to read only property 'b' of object
```

아래는 좀 더 개선한 예제입니다.

```javascript
function log(target, name, descriptor) {
  const original = descriptor.value;
  if (typeof original === "function") {
    descriptor.value = function(...args) {
      console.log(`Arguments: ${args}`);
      try {
        const result = original.apply(this, args);
        console.log(`Result: ${result}`);
        return result;
      } catch (e) {
        cosnole.log(`Error: ${e}`);
        throw e;
      }
    };
  }
  return descriptor;
}

class Example {
  @log
  sum(a, b) {
    return a + b;
  }
}

const e = new Example();
e.sum(1, 2);
// Arguments: 1,2
// Result: 3
```

단계를 올려볼까요.

```javascript
function log(name) {
  return function decorator(t, n, descriptor) {
    const original = descriptor.value;
    if (typeof original === "function") {
      descriptor.value = function(...args) {
        console.log(`Arguments for ${name}: ${args}`);
        try {
          const result = original.apply(this, args);
          console.log(`Result from ${name}: ${result}`);
          return result;
        } catch (e) {
          console.log(`Error from ${name}: ${e}`);
          throw e;
        }
      };
    }
    return descriptor;
  };
}

class Example {
  @log("some tag")
  sum(a, b) {
    return a + b;
  }
}

const e = new Example();
e.sum(1, 2);
// Arguments for some tag: 1,2
// Result from som tag: 3
```

### Class decorators

Class decorators는 한번에 모든 클래스에 적용됩니다. Decorator 함수는 decorated된 생성자 함수인 단일 매개변수와 함께 호출됩니다.

이때 decorators는 생성자 함수에 적용되는 것으로, 각 인스턴스가 생성될 때마다 적용되는 것이 아닙니다. 즉 인스턴스를 조정하기 위해서는 wrapped된 버전의 생성자를 반환해야 합니다.

일반적으로, class decorators는 class member decorators보다는 덜 유용한데, 간단한 함수를 호출하는 것으로 정확히 같은 방식으로 적용할 수 있기 때문입니다.

logging 예제로 돌아갑시다.

```javascript
function log(Class) {
  return (...args) => {
    console.log(args);
    return new Class(...args);
  };
}

@log
Class Example {
  constructor(name, age) {}
}

const e = new Example('Graham', 34);
// ['Graham', 34]
console.log(e);
// Example {}
```

Class member decorators와 마찬가지로 Class decorators에도 매개변수를 넣어봅시다.

```javascript
function log(name) {
  return function decorator(Class) {
    return (...args) => {
      console.log(`Arguments for ${name}: args`);
      return new Class(...args);
    };
  };
}

@log('Deme')
Class Example {
  constructor(name, age) {}
}

const e = new Example('Graham', 34);
// Argumants for Demo: args
console.log(e);
// Example {}
```

## JavaScript Decorators vs. Java Annotation

아래 내용은 [TypeScript and ES2016 Decorators vs. Java Annotations](https://www.beyondjava.net/typescript-and-es2016-decorators-vs-java-annotations)를 참고하여 공부하고 정리한 내용입니다. 💻
