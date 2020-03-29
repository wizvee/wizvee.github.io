---
# type: 'post'
title: 'Javascript 디자인 패턴들'
date: '2019-12-30'
tags: ['JavaScript']
---

비전공자로서 개발을 공부하면서 언제나 기초 지식에 목말라 있었는데요. 😢 최근 꾸준히 참여하고 있는 개발자 모임에서 이에 대해 선배 개발자님들께 질문을 드렸을 때, 우선 디자인 패턴에 대해 공부해보라고 조언을 받은 적이 있었어요.

찾아보니 여러 프로그래밍 언어로 디자인 패턴에 대해 정리해 둔 좋은 자료 및 도서가 많았는데요. 두꺼운 기본서를 구입하기 전에! 😅 가볍게 디자인 패턴이 무엇인지 훑어보기 좋은 자료를 찾게 되어, 우선은 디자인 패턴을 눈에 익혀보려고 합니다.

해당 포스팅은 [Writing Maintainable and Readable Javascript: Design Patterns](https://www.javascriptjanuary.com/blog/writing-maintainable-and-readable-javascript-design-patterns)을 참고하여 공부한 내용을 정리하였습니다. 👩‍💻

## What are The Design Patterns?

위키백과에 따르면, 소프트웨어 **디자인 패턴**은 **소프트웨어 공학에서 특정 상황에서 공통적으로 발생하는 문제에 대해 재사용 가능한 해결책**이라고 합니다. 재사용되는 디자인 패턴은 테스트되고 입증된 해결책을 우리에게 제공함으로써 소트프웨어 개발 프로세스에 속도를 더할 수 있습니다.

자바스크립트 생에에서, 많은 디자인 패턴들이 수 많은 개발자들에 의해 만들어지고 테스트되었습니다. 여기에는 자바스크립트 개발자들이 사용하는 보편적인 디자인 패턴들을 살펴볼 것입니다.

디자인 패턴은 **creational patterns**, **structural patterns** 그리고 **behavioral patterns**으로 나눌 수 있습니다.

## Creational Pattern

생성 패턴은 작업 중인 상황에 맞게 새 객체 생성을 최적화하는 것에 초점을 두고 있습니다. 객체 생성을 위한 기본적인 메서드는 약간의 디자인 복잡성을 추가할 수 있으므로, 이하 생성 패턴은 이러한 복잡성을 제거하는 것을 도웁니다.

### Constructor Pattern

생성자는 객체의 새 인스턴스를 생성하는 함수입니다.

```javascript
class Car {
  constructor(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
  }
  toString() {
    return `${this.model} has done ${this.miles} miles`;
  }
}

let mondeo = new Car('Ford Mondeo', 2010, 5000);
console.log(mondeo.toString()); // Ford Mondeo has done 5000 miles
```

### Prototype Pattern

프로토 타입 패턴은 프로토 타입 상속에 근거합니다. 우리는 다른 객체들을 위해 프로토 타입으로 행동하는 객체를 생성합니다. 프로토 타입 객체 자체는 다른 객체들을 생성하기 위한 청사진으로써 효과적으로 사용됩니다.

```javascript
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stopped.`);
  }
}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit('White Rabbit');
rabbit.run(5); // White rabbit runs with speed 5.
rabbit.hide(); // White rabbit hides!
```

### Module Pattern

모듈은 애플리케이션에서 재사용할 수 있는 작고 독립적인 컴포넌트들의 그룹입니다. 컴포넌트는 함수, 객체 심지어 변수도 될 수 있습니다. 모듈 패턴은 private 컴포넌트들의 캡슐화하고 이에 접속하는 public API를 반환하는 것을 돕습니다.

```javascript
// car.js
class Car {
  constructor(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
  }
  toString() {
    return `${this.model} has done ${this.miles} miles`;
  }
}
export default Car;

// main.js
import Car from './car.js';
let mondeo = new Car('Ford Mondeo', 2010, 5000);
console.log(mondeo.toString()); // Ford Mondeo has done 5000 miles
```

### Singleton Pattern

싱글톤 패턴은 객체를 단일 인스턴스로 제한하는 데 사용되는 패턴입니다. 만약 객체가 존재하지 않을 경우 싱글톤은 인스턴스를 만듭니다. 존재한다면, 존재하는 인스턴스를 반환합니다.

```javascript
class Car {
  constructor(model, year, miles) {
    if (Car.exists) {
      return Car.instance;
    }
    this.model = model;
    this.year = year;
    this.miles = miles;
    Car.exists = true;
    Car.instnace = this;
    return this;
  }
  toString() {
    return `${this.model} has done ${this.miles} miles`;
  }
}

let civic = new Car('Honda Civic', 2009, 20000);
let mondeo = new Car('Ford Mondeo', 2010, 5000);

console.log(civic.toString()); // Honda Civic has done 20000 miles
console.log(mondeo.toString()); // Honda Civic has done 20000 miles
```

### Factory Pattern

팩토리 패턴은 우리가 만들 팩토리 객체의 타입을 지정할 수 있는 인터페이스를 제공하여 객체를 추상화합니다. 팩토리 패턴은 다음과 같은 상황에서 특히 유용할 수 있습니다.

- 객체나 컴포넌트 설정에 복잡성이 높은 경우
- 우리가 속한 환경에 따라 다른 객체 인스턴스를 쉽게 생성해야 할 때
- 같은 속성들을 공유하는 많고 작은 객체들이나 컴포넌트들을 사용해야 할 때
- API 규약만 만족시키면 되는 다른 객체들의 인스턴스로 객체들을 구성할 때

```javascript
class Car {
  constructor(doors, state, color) {
    this.doors = doors || 4;
    this.state = state || "brand new";
    this.color = color || "silver";
  }
  props() {
    return `I am a ${this.state} ${this.color} car and I have ${this.doors} doors`;
  }
}

// A class for defining new trucks
class Truck {
  constructor(state, wheelSize, color) {
    this.state = state || "used";
    this.wheelSize = wheelSize || "large";
    this.color = color || "blue";
  }
  props() {
    return `I am a ${this.state} ${this.color} truck and I have a ${this.wheelSize} wheels`;
  }
}

// Define a factory
class VehicleFactory {
  constructor(options) {
    let vehicle:
    switch(options.type) {
      case "car":
        vehicle = new Car(options.doors, options.state, options.color);
        break;
      case "truck":
        vehicle = new Truck(options.state, options.wheelSize, options.color);
        break;
    }
    return vehicle;
  }
}

let options1 = {
  type: "car",
  color: "yellow",
  doors: 6
}
let options2 = {
  type: "truck",
  state: "like new",
  color: "red",
  wheelSize: "small"
}

let car = new VehicleFactory(options1);
let truck = new VehicleFactory(options2);
```

## Structural Pattern

구조 패턴은 다른 객체들 사이에서 어떻게 구성되고 다른 객체 사이의 관계를 단순화시키는 지에 관한 것입니다. 이러한 패턴은 시스템의 일부분이 변경될 때 시스템의 전체 구조가 동일하게 수행될 필요가 없는 방식으로 객체가 구성되도록 합니다.

### Facade Pattern

퍼사드 패턴은 깔끔하고 사용하기 쉬운 인터페이스를 제공하여 대량의 코드의 기본 복잡성을 단순화하고 숨깁니다.

```javascript
class TaskService {
  constructor(data) {
    this.name = data.name;
    this.priority = data.priority;
    this.project = data.project;
    this.user = data.user;
    this.completed = data.completed;
  }
  complete() {
    this.completed = true;
    console.log(`completing task: ${this.name}`);
  }
  setCompleteDate() {
    this.completedDate = new Date();
    console.log(`${this.name} completed on ${this.completedDate}`);
  }
  notifyCompletion() {
    console.log(`Notifying ${this.user} of the completion of ${this.name}`);
  }
  save() {
    console.log(`saving Task: ${this.name}`);
  }
}

class TaskServiceFacade extends TaskService {
  constructor(data) {
    super(data);
  }
  completeAndNofity() {
    this.complete();
    this.setCompleteDate();
    this.notifyCompletion();
    this.save();
  }
}

let myTask = new TaskServiceFacade({
  name: 'MyTask',
  priority: 1,
  project: 'Courses',
  user: 'Jon',
  complted: false,
});
console.log(myTask.completeAndNofity());
// completing task: MyTask
// MyTask completed on Sun Jan 06 2019
// Notifying Jon of completion of MyTask
// saving Task: MyTask
```

### Decorator Pattern

데코레이터 패턴은 클래스에 새로운 기능성을 더하는 것에 초점을 맞춘 구조적 패턴입니다.

```javascript
// The constructor to decorate
class MackBook {
  cost() {
    return 997;
  }
  screenSize() {
    return 11.6;
  }
}
// Decorator 1
function mackbookDecorator(macbook) {
  macbook.discount = function() {
    return macbook.cost() * 0.1;
  };
  return macbook;
}
// Decorator 2
function mackbookDecorator2(macbook) {
  let v = macbook.cost();
  macbook.cost = function() {
    return v + 75;
  };
  return macbook;
}
// usage
const decorator1 = macbookDecorator(new MacBook());
console.log(decorator1.cost()); // 997
console.log(decorator1.discout()); // 99.7
const decorator2 = macbookDecorator2(new MacBook());
console.log(decorator2.cost()); // 1072
```
