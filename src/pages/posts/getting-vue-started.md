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

처음 개념을 익히는 것이니 CLI로 프로젝트를 구성하는 것보다는 CDN 방식으로 뷰에 익숙해지려고 합니다! 😊

## Vue Instance

뷰로 웹 애플리케이션을 개발할 때 반드시 알아야 하는 두 가지 요소는 **인스턴스**와 **컴포넌트**입니다. 처음 매뉴얼이나 강의를 봤을 때 해당 개념이 무척 헷갈리기도 했어요. 그래서 포스팅에서 차근차근 정리하면서 개념을 잡아보려고 합니다.

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

## Vue Component

뷰 컴포넌트는 기본 HTML 엘리먼트를 확장하여 재사용 가능한 코드를 캡슐화합니다. 또한 뷰 컴포넌트는 뷰 인스턴스이기도 합니다. 그러므로 모든 옵션 객체를 사용할 수 있으며 라이프사이클 훅을 사용할 수 있습니다.

```javascript
// global component
Vue.component('my-component', {
  template: '<div>사용자 정의 컴포넌트입니다!</div>',
});

// local component
const Child = {
  template: '<div>사용자 정의 컴포넌트입니다!</div>',
};

new Vue({
  // ...
  components: {
    'my-component': Child,
  },
});
```

## Vue Router

뷰 라우터는 뷰에서 라우팅 기능을 구현할 수 있도록 지원하는 공식 라이브러리입니다. 뷰 라우터를 이용해 뷰로 만든 페이지 간에 자유롭게 이동할 수 있습니다.

```HTML
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 기본적으로 <router-link>는 <a> 태그로 렌더링 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 라우트 아울렛 -->
  <!-- 현재 라우트에 맞는 컴포넌트가 렌더링 -->
  <router-view></router-view>
</div>
```

```javascript
// 라우트 컴포넌트 정의
const Foo = { template: '<div>Foo</div>' };
const Bar = { template: '<div>Bar</div>' };

// 라우트 정의
// 각 라우트는 반드시 컴포넌트와 매핑
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
];

// router instance 생성
const router = new VueRouter({
  routes,
});

// root instance를 만들고 mount
const app = new Vue({
  router,
}).$mount('#app');
```

### Dynamic Route matching

**주어진 패턴을 가진 라우트를 동일한 컴포넌트에 매핑해야하는 경우**가 있습니다. 예를 들어 모든 사용자에 대해 동일한 레이아웃을 가지지만 각각 다른 사용자 ID로 렌더링되어야 하는 `User` 컴포넌트가 있을 수 있습니다.

```javascript
const User = {
  template: '<div>{{ $route.params.id }}</div>',
};

const router = new VueRouter({
  routes: [
    // dynamic segments start with a colon
    { path: '/user/:id', component: user },
  ],
});
```

동일한 라우트에 여러 동적 세그먼트를 가질 수 있습니다. `/user/:username/post/:post_id` 처럼요.

### Nested Routes

`vue-router`를 사용하면 중첩된 라우트 구성을 사용하는 것이 매우 간단합니다.

렌더링된 컴포넌트는 자신의 중첩된 `<router-view>`를 포함할 수도 있습니다.

```javascript
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view> 
    </div>
  `,
};
```

이 중첩된 outlet에 컴포넌트를 렌ㄷ링하려면 `children`을 사용해야합니다.

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        {
          // /user/:id가 일치할 때
          {path: '', component: userHome},
          // /user/:id/profile과 일치할 때
          path: 'profile',
          component: UserProfile,
        },
        {
          // /user/:id/posts와 일치할 때
          path: 'posts',
          component: userPosts,
        },
      ],
    },
  ],
});
```

### Named Views

때로는 여러 개의 뷰를 중첩하지 않고 동시에 표시해야 하는 경우도 있습니다.

```HTML
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

뷰는 컴포넌트를 사용하여 렌더링되므로 동일한 라우트에 대해 **여러 컴포넌트**가 필요합니다.

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz,
      },
    },
  ],
});
```
