---
type: 'post'
title: 'Vue 시작하기'
date: '2019-12-10'
tags: ['Vue']
---

프런트엔드 개발자를 꿈꾸게 되면서 주력으로 사용할 프레임워크를 고민했던 적이 있어요. 결국 React를 선택했었는데. 그런데 아이러니하게도 취업한 곳에서는 Vue를 사용하는 불상사가... 😅 결국 최근 가장 각광받는 프런트엔드의 세 프레임워크 중 두 가지를 공부할 수 있게 되었습니다.

## Vue 시작하기

Vue 프로젝트를 시작하는 방법에는 두 가지가 있습니다.

1. **CDN**을 사용해 뷰 라이브러리를 로딩한 후 프로젝트를 구성
2. **CLI**를 사용해 프로젝트를 구성

```HTML
<!-- CND방법으로 스크립트 불러오기 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
```

뷰로 웹 애플리케이션을 개발할 때 반드시 알아야 하는 두 가지 요소는 **인스턴스**와 **컴포넌트**입니다. 처음 매뉴얼이나 강의를 봤을 때 해당 개념이 무척 헷갈리기도 했어요. 그래서 포스팅에서 차근차근 정리하면서 개념을 잡아보려고 합니다.

## Vue Instance

모든 Vue 애플리케이션은 `Vue` 함수로 새 **Vue 인스턴스**를 만드는 것부터 시작합니다. 제가 이해한 바로는 `ReactDOM.render` 함수와 비슷한 역할이 아닐까 합니다.

```javascript
// React
ReactDOM.render(<h1>Hello, React!</h1>, document.getElementById('root'));

// Vue
new Vue({
  el: '#app',
  template: '<h1>Hello, Vue!</h1>',
});
```

### Lifecycle Hooks

각 뷰 인스턴스는 생성될 때 일련의 초기화 단계를 거칩니다. 그 과정에서 사용자 정의 로직을 실행할 수 있는 **lifecycle hooks**도 호출됩니다. lifecycle hooks는 총 8개가 있습니다.

1. `beforeCreate`
2. `created`: data 속성과 methods 속성에 접근할 수 있는 가장 첫 라이프 사이클 단계이자 컴포넌트가 생성되고 나서 실행되는 첫 단계입니다. 때문에 **서버에 데이터를 요청해서 받아오는 로직**을 수행하기에 알맞습니다.
3. `beforeMount`
4. `mounted`
5. `beforeUpdate`
6. `updated`: 데이터가 변경되고 나서 가상 돔으로 다시 화면을 그리고 나면 실행되는 단계입니다. 따라서 **데이터 변경 후 화면 요소 제어와 관련된 로직을 추가**하기에 좋습니다.
7. `beforeDestroy`
8. `destroyed`

```javascript
new Vue({
  data: {
    a: 1,
  },
  created: function() {
    // `this` points to the vm instance
    console.log('a is: ' + this.a);
  },
});
```

이때 **주의할 점**은 `created: () => console.log(this.a)`와 같이 **화살표 함수 사용은 지양해야 한다**는 것입니다. 화살표 함수의 `this`는 **언제나 상위 스코프의 `this`를 가리키기 때문**입니다.

### Vue Component
