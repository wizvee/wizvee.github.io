---
type: 'post'
title: 'Vuex 시작하기'
date: '2019-12-11'
tags: ['Vue']
---

**Vuex**는 애플리케이션의 상태 관리를 돕는 라이브러리입니다. React에 대입하자면 Redux나 MobX와 비슷한 역할을 해요. 그렇기 때문에 **Flux** 상태 관리 패턴을 따릅니다.

저는 아주 간단한 카운터 애플리케이션을 만들어보면서 **Vuex**를 익혀보려고 합니다. 😊

## Vuex 설치

Vuex 역시 Vue와 마찬가지로 직접 다운로드하거나 CDN 방식으로 웹 애플리케이션에 적용할 수 있습니다. 여기서는 NPM을 통해 직접 다운로드하여 적용합니다.

```bash
npm install vuex --save
```

### 카운터 구현

vuex의 원리와 작동 방식을 이해하기 위한 아주 간단한 카운터를 만들 거예요. 그러므로 따로 파일을 생성하지 않고 `main.js`에 간단하게 스토어를 만들어 줍니다.

```javascript
// main.js
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';

// 모듈 시스템과 함께 사용하려면 `Vue.use()`를 통해
// Vuex를 명시적으로 추가해야 합니다.
Vue.use(Vuex);

// 스토어를 생성합니다. `App.vue`에서 스토어를
// import하기 위해 export합니다.
export const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
  },
});

new Vue({
  el: '#app',
  render: h => h(App),
});
```

이제 `App.vue`에 카운터를 구현합니다.

```HTML
<template>
  <div>
    {{ count }}
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
  </div>
</template>

<script>
// App.vue

// `main.js`에서 생성한 스토어 import
import { store } from './main';
export default {
  computed: {
    count() {
      return store.state.count;
    },
  },
  // 스토어의 mutations를 커밋
  methods: {
    increment() {
      store.commit('increment');
    },
    decrement() {
      store.commit('decrement');
    },
  },
};
</script>
```

아주 간단한 카운터가 구현되었습니다! 🎉 이제 이 카운터를 개선하면서 Vuex에 대해 좀 더 알아보려고 합니다.

## State

Vuex는 **단일 상태 트리**를 사용합니다. 이는 각 애플리케이션마다 하나의 스토어만 갖게 된다는 것을 의미합니다. 단일 상태 트리를 사용하면 특정 상태를 쉽게 찾을 수 있습니다.

Vuex 스토어는 반응적이기 대문에 스토어에서 상태를 **검색**하는 가장 간단한 방법은 `computed` 속성 내에서 일부 스토어 상태를 가져오는 것입니다.

```javascript
// App.vue

import { store } from './main';
export default {
  // `computed` 속성 내에 스토어 상태 검색
  computed: {
    count() {
      return store.state.count;
    },
  },
// (...)
```

`store.state.count`가 변경되면 계산된 속성이 다시 변경되고 관련 DOM 업데이트가 트리거됩니다.

그러나 이 패턴은 컴포넌트가 전역 스토어 단역 항목에 의존하게 합니다. 모듈 시스템을 사용할 때는 스토어 상태를 사용하는 모든 컴포넌트에서 스토어를 가져와야 합니다.

Vuex는 `store` 옵션으로 루트 컴포넌트의 모든 자식 컴포넌트에 스토어를 **주입**하는 메커니즘을 제공합니다.

```javascript
// main.js
// (...)

// 스토어에서 export를 제외합니다
const store = new Vuex.Store({
  // (...)
});

// Vue 인스턴스에 `store` 속성을 추가합니다
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
```

```javascript
// App.vue
// (...)

// <script>에서 스토어 import문을 제외합니다
export default {
  computed: {
    count() {
      // 주입된 스토어의 상태는 `this.$store`로 사용 가능합니다
      return this.$store.state.count;
    },
  },
  methods: {
    increment() {
      // mutations도 동일합니다
      this.$store.commit('increment');
    },
  // (...)
```

### mapState 헬퍼

하지만 이러한 접근 방법은 컴포넌트 내에서 여러 상태에 접근해야 하는 경우 반복적이고 장황해질 수 있습니다. 이러한 부분을 `mapState` 헬퍼 함수를 통해 더욱 더 간결하게 사용할 수 있습니다.

```javascript
// App.vue
// (...)

// mapState를 import 합니다
import { mapState } from 'vuex';
export default {
  data() {
    return {
      number: 1,
    };
  },
  computed: {
    localComputed() {
      /* ... */
    },
    ...mapState({
      count: state => state.count,
      // `this`를 사용하여 로컬 상태에 액세스하려면
      // 일반적인 함수를 사용해야 합니다.
      sum(state) {
        return state.count + this.number;
      },
    }),
  },
```

## Getter

때로는 스토어 상태를 기반하는 상태를 계산해야 할 수도 있습니다. Vuex를 사용하면 스토어에서 **getters**를 정의할 수 있습니다. 이는 스토어의 `computed` 속성으로 생각할 수 있습니다. `computed` 속성같이 getter의 결과는 종속성에 따라 캐시되고, 일부 종속성이 변경된 경우에만 다시 재계산됩니다.

```javascript
// main.js
// (...)

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {
    add: state => state.count + state.count,
    multiply: (state, getters) => getters.add * state.count,
  },
  // (...)
```

이렇게 선언된 getter는 `store.getters` 속성을 통해 접근할 수 있습니다.

```javascript
// App.vue
// (...)

  computed: {
    ...mapState({
      count: state => state.count,
      sum(state) {
        return state.count + this.number;
      },
    }),
    add() {
      // `store.getters` 속성으로 getter에 접근할 수 있습니다
      return this.$store.getters.add;
    },
    multiply() {
      return this.$store.getters.multiply;
    },
    // (...)
```

### mapGetters 헬퍼

getters 역시 `mapGetters` 헬퍼 함수를 통해 더욱 더 간결하게 사용할 수 있습니다.

```javascript
// App.vue
// (...)

  computed: {
    localComputed() {
      /* ... */
    },
    ...mapState({
      count: state => state.count,
      sum(state) {
        return state.count + this.number;
      },
    }),
    ...mapGetters([
      // 같은 이름으로 매핑할 경우
      'add',
      'multiply',
    ]),
  },
  // (...)
```

## Mutations

Vuex 스토어에서 실제로 상태를 변경하는 유일한 방법은 **변이**하는 것입니다. 변이 핸들러를 직접 호출할 수는 없으며, 이를 위해서는 해당 타입과 함께 `store.commit()`을 호출해야 합니다.

Vuex 스토어 상태는 Vue에 의해 반응하므로, 상태를 변경하면 상태를 관찰하는 Vue 컴포넌트가 자동으로 업데이트됩니다.

또한 **mutation은 무조건 동기적이어야 합니다.**

### mapMutations 헬퍼

변이 역시 `mapMutations` 헬퍼 함수를 통해 더욱 더 간결하게 사용할 수 있습니다.

## Actions

액션은 변이와 유사합니다. 몇 가지 다른 점은,

- 상태를 변이시키는 대신 액션으로 변이에 대한 커밋을 합니다.
- 작업에는 임의의 **비동기 작업이 포함**될 수 있습니다.

액션은 `store.dispatch` 메소드로 시작됩니다.

```javascript
// main.js
// (...)

const store = new Vuex.Store({
  // (...)
  mutations: {
    increment: (state, payload) => (state.count += payload),
    decrement: (state, payload) => (state.count -= payload),
  },
  actions: {
    // 주로 비동기 작업에 실용적입니다
    incrementAsync({ commit }, payload) {
      setTimeout(() => commit('increment', payload), 1000);
    },
  },
});
// (...)
```

### mapActions 헬퍼

액션 역시 `mapActions` 헬퍼 함수를 통해 더욱 더 간결하게 사용할 수 있습니다.

## Modules

단일 상태 트리를 사용하기 때문에 애플리케이션의 모든 상태가 하나의 큰 객체 안에 포함됩니다. 그러나 규모가 커짐에 따라 스토어는 매우 비대해질 수 있습니다.

이를 위해 Vuex는 스토어를 **모듈**로 나눌 수 있습니다. 각 모듈은 자체 상태, 변이, 액션, 게터 및 심지어 중첩된 모듈을 포함할 수 잇습니다.

```javascript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA'의 상태
store.state.b // -> moduleB'의 상태
```
