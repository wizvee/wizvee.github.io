---
type: 'series'
topic: 'Vue.js 알아보기'
title: 'Vue 시작하기'
date: '2019-12-10'
tags: ['Vue']
---

프런트엔드 개발자를 꿈꾸게 되면서 주력으로 사용할 프레임워크를 고민했던 적이 있어요. 결국 React를 선택했었는데, 아이러니하게도 취업한 곳에서는 Vue로 주로 프런트엔드를 개발하신다고… 😅 결국 React와 Vue 모두를 공부하게 되었습니다!

## Vue 시작하기

Vue 프로젝트를 시작하는 방법에는 두 가지가 있습니다.

1. **CDN**을 사용해 뷰 라이브러리를 로딩한 후 프로젝트를 구성
2. **CLI**를 사용해 프로젝트를 구성

```HTML
<!-- CDN 방법으로 스크립트 불러오기 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
```

```bash
# Vue CLI 전역 설치
npm install vue-cli -g

# Vue CLI를 사용하여 프로젝트 생성
vue init <template-name> <project-name>
```

뷰의 모든 기능을 최대한 활용하기 위해서는 CLI를 통하여 프로젝트를 구성하는 것이 좋습니다. 그렇지만 단일 웹 페이지에 뷰를 적용하거나 간단한 프로젝트의 경우에는 CDN만으로도 간편히 뷰를 시작할 수 있습니다.

이렇게 쉽게 적용할 수 있는 점이 뷰의 가장 큰 매력 같아요. 😃

### CLI 2.x vs 3.x

1. **명령어**

   - 2.x: `vue init [template-name] [project-name]`
   - 3.x: `vue create [project-name]`

2. **webpack config file**

   - 2.x: 노출 O
   - 3.x: 노출 X

3. **project structure**

   - 2.x: download template at github
   - 3.x: add plugin

4. **ES6**

   - 2.x: 필요 O
   - 3.x: 필요 X

## Vue Instance

뷰로 웹 애플리케이션을 개발할 때 반드시 알아야 하는 두 가지 요소는 **인스턴스**와 **컴포넌트**입니다. 개인적으로 헛갈렸던 개념이기도 해요. 그래서 포스팅에서 차근차근 정리하면서 개념을 잡아보려고 합니다.

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

뷰의 인스턴스는 생성될 때 일련의 초기화 단계를 거칩니다. 그 과정에서 사용자 정의 로직을 실행할 수 있는 **라이프사이클 훅**도 호출됩니다. 라이프사이클 훅의 종류는 다음과 같습니다.

1. `beforeCreate`

2. `created`: data 속성과 methods 속성에 접근할 수 있는 가장 첫 라이프 사이클 단계이자 컴포넌트가 생성되고 나서 실행되는 첫 단계입니다. 때문에 **서버에 데이터를 요청해서 받아오는 로직**을 수행하기에 알맞습니다. 다만 아직 가상 돔에는 **요소들이 그려지지 않았어요.**

3. `beforeMount`

4. `mounted`: 가상 돔에 **요소들이 그려진 단계**입니다. 이제 요소를 제어할 수 있습니다. 개인적으로는 리액트 훅에서 `useEffect`와 유사한 느낌이에요. 😎

5. `beforeUpdate`

6. `updated`: 데이터가 변경되고 나서 가상 돔으로 다시 화면을 그리고 나면 실행되는 단계입니다. 따라서 **데이터 변경 후 화면 요소 제어와 관련된 로직**을 추가하기에 좋습니다.

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

이때 **주의할 점**은 라이프사이클 훅에 `created: () => console.log(this.a)`와 같이 **화살표 함수 사용은 지양해야 한다**는 것입니다. 화살표 함수의 `this`는 **언제나 상위 스코프의 `this`를 가리키기 때문**입니다.

## Vue Component

뷰 컴포넌트는 기본 HTML 엘리먼트를 확장하여 재사용 가능한 코드를 캡슐화합니다. 또한 뷰 컴포넌트는 뷰 인스턴스이기도 합니다. 그러므로 모든 옵션 객체를 사용할 수 있으며 라이프사이클 훅을 사용할 수 있습니다.

뷰 컴포넌트는 전역으로 등록하여 모든 인스턴스에서 사용할 수도 있고, 특정 인스턴스 내에서 지역으로 등록하여 해당 인스턴스 내에서만 사용할 수도 있습니다.

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

그렇다면 어떻게 뷰 컴포넌트를 설계하는 것이 좋을까요? 🤔

### FIRST 원칙

객체지향 프로그래밍에는 **SOLID 설계 원칙**이 있듯, 컴포넌트 설계에는 **FIRST 설계 원칙**이 있습니다.

1. **Focused**: SOLID 설계 원칙에서 **단일 책임 원칙**과 같습니다. 각각의 기능을 가진 작은 단위들을 만들어 커다란 하나의 기능을 완성합니다.

2. **Independent**: 컴포넌트가 자기가 가지고 있는 기능을 수행하기 위해서 다른 컴포넌트의 도움을 받지 않아야 합니다.

3. **Reusable**: 컴포넌트는 재사용 가능해야 합니다.

4. **Small**: 컴포넌트는 가능한 작고 단순한 기능을, 즉 작은 API를 가져야 합니다.

5. **Testable**: 쉬운 디버깅이 가능한 컴포넌트를 작성해야 합니다.

### Slots

뷰에서 제공해주는 내장 컴포넌트인 `slot` 컴포넌트와 속성을 통해 템플릿을 만들 수 있습니다. 개인적으로는 리액트의 `children`과 비슷한 느낌을 받았습니다.

```HTML
<!-- nav-link template -->
<a :href="url" class="nav-link">
<slot></slot>
</a>

<!-- use template -->
<nav-link url="/profile">
Your Profile
</nav-link>
```

요소의 내용이 `slot` 컴포넌트를 대체하게 됩니다.

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

## Vue Template

뷰 템플릿은 HTML, CSS 등의 마크업 속성과 뷰 인스턴스에서 정의한 데이터 및 로직들을 연결하여 사용자가 브라우저에서 볼 수 있는 형태의 HTML로 변환해주는 속성입니다. React의 JSX와 유사합니다.

### single file components

싱글 파일 컴포넌트 체계란 `.vue` 파일로 프로젝트 구조를 구성하는 방식을 말합니다. 확장자 `.vue` 파일 1개는 뷰 애플리케이션을 구성하는 1개의 컴포넌트와 동일합니다.

싱글 파일 컴포넌트 체계를 사용하기 위해서는 .vue 파일을 웹 브라우저가 인식할 수 있는 형태의 파일로 변환해 주는 웹팩과 같은 도구가 필요합니다. 그래서 뷰 개발자들이 편하게 프로젝트를 구성할 수 있도록 **CLI(Command Line Interface)** 도구를 제공합니다.

### Vue Loader

뷰 로더는 웹팩에서 지원하는 라이브러리입니다. 뷰 로더는 싱글 파일 컴포넌트 체계에서 사용하는 .vue 파일의 내용을 브라우저에서 실행 가능한 웹 페이지의 형태로 변환해 줍니다.

```javascript
module: {
  rules: [
    {
      // 로더가 적용될 대상 파일을 지정
      test: /\.vue$/,
      // 적용한 로더의 종류
      loader: 'vue-loader',
      options: {
        loaders: {},
      },
    },
  ];
}
```

**기타**

1. .vue 파일에서 `<style>` 태그에 사용되는 `scoped`는 뷰에서 지원하는 속성입니다. 스타일 정의를 해당 컴포넌트에만 적용하겠다는 의미입니다.

## Transition

뷰는 항목이 돔에 삽입, 갱신 또는 제거 될 때 트랜지션 효과를 적용하는 다양한 방법을 제공합니다.

### Transitioning Single Elements/Compoenents

뷰는 `transition` 래퍼 컴포넌트를 제공하므로 다음과 같은 상황에서 모든 엘리먼트 또는 컴포넌트에 대한 진입/진출 트랜지션을 추가할 수 있습니다.

```HTML
<template>
  <div id="demo">
    <button v-on:click="show = !show">
      Toggle
    </button>
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>

<script>
  export default {
    data: {
      show: true
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
```

`transition` 컴포넌트로 싸여진 엘리먼트가 삽입되거나 제거 될 때 일어납니다.

### Transition Classes

진입/진출 트랜지션에는 네 가지 클래스가 적용됩니다.

1. `v-enter`: enter의 시작 상태. 엘리먼트가 삽입되기 전에 적용되고 한 프레임 후에 제거됩니다.

2. `v-enter-active`: enter에 대한 활성 및 종료 상태. 엘리먼트가 삽입되기 전에 적용됩니다. 트랜지션/애니메이션이 완료되면 제거됩니다.

3. `v-enter-to`: **2.1.8 이상 버전에서 지원**합니다. 진입 상태의 끝에서 실행됩니다.

4. `v-leave`: leave를 위한 시작 상태. 진출 트랜지션이 트리거 될 때 적용되고 한 프레임 후에 제거됩니다.

5. `v-leave-active`: leave에 대한 활성 및 종료 상태. 진출 트랜지션이 트리거되면 적용되고 트랜지션/애니메이션이 완료되면 제거됩니다.

6. `v-leave-to`: **2.1.8 이상 버전에서 지원**합니다. 진출 상태의 끝에서 실행됩니다.

### Transitions on Initial Render

노드의 초기 렌더에 트랜지션을 적용하고 싶다면 `appear` 속성을 추가할 수 있습니다.
