---
type: 'series'
topic: 'Vue.js 알아보기'
title: 'Vuex'
date: '2020-03-21'
tags: ['Vue']
---

## Vuex

**Vuex**는 애플리케이션의 상태 관리를 돕는 라이브러리입니다. React에 대입해보자면 Redux나 MobX와 비슷한 역할을 하죠. Vuex 역시 **Flux** 상태 관리 패턴을 따릅니다.

Vuex의 중심에는 **store**가 있습니다. 스토어는 기본적으로 애플리케이션의 **상태**를 보유하고 있는 컨테이너입니다. 스토어는 일반 전역 객체와 두 가지 차이점이 있습니다.

1. 스토어는 **반응형**입니다. Vue 컴포넌트는 스토어의 상태가 변경되면 업데이트됩니다.
2. 스토어의 **상태를 직접 변경할 수 없습니다.** 오직 `mutations`를 `commit`하여 상태를 변경합니다. 이렇게 하면 모든 상태에 대한 추적이 기록으로 남게 되어 추적이 가능합니다.

### 1. 카운터 구현

이제 간단한 카운터 앱을 구현하고 개선하며 Vuex의 원리와 작동 방식을 이해해보려고 합니다. 😊 아주 간단한 앱이기 때문에 스토어를 모듈화하지 않고 `main.js`에 바로 생성했어요.

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';

Vue.config.productionTip = false;

// 모듈 시스템을 사용하기 위해 Vue에
// Vuex를 명시적으로 추가합니다
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutation: {
    increment: state => state.count++,
    decrement: state => state.count--,
  },
});

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
```

이제 `App.vue`에 카운터를 구현합니다.

```html
<template>
  <div id="app">
    <p>{{count}}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      count() {
        return this.$store.state.count;
      },
    },
    methods: {
      increment() {
        this.$store.commit('increment');
      },
      decrement() {
        this.$store.commit('decrement');
      },
    },
  };
</script>
```

아주 간단한 카운터가 구현되었습니다! 🎉 이제 이 카운터 앱으로 Vuex에 대해 알아봅시다.

### 2. State

Vuex는 **단일 상태 트리**를 사용합니다. 즉 각 애플리케이션은 단 하나의 스토어만 갖게 된다는 거죠. 단일 상태 트리를 사용하면 특정 상태를 쉽게 찾을 수 있는 장점이 있습니다.

스토어에서 상태를 검색하는 가장 간단한 방법은 `computed` 속성 내에서 일부 스토어 상태를 가져오는 것입니다. 즉, 아래 코드죠!

```html
<script>
  export default {
    name: 'App',
    computed: {
      count() {
        return this.$store.state.count;
      },
    },
    // ...
  };
</script>
```

`this.$store.state.count`가 변경되면 `computed` 속성 또한 이를 감지하고 `count` 값을 변경합니다. 최후에 컴포넌트는 관련된 DOM을 업데이트합니다.

이때 `this.$store`는 처음부터 사용할 수 있는 전역 API는 아닙니다. Vuex의 `store` 옵션을 사용하여 루트 컴포넌트의 모든 자식 컴포넌트에 스토어를 주입한 것이죠. 즉 아래 코드에서 이루어진 일이예요.

```javascript
new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
```

#### 2.1 `map` 헬퍼

만약 컴포넌트에서 스토어의 여러 상태를 사용해야 하는 경우, 일일이 `this.$store.state`로 상태를 가져오게 된다면 반복적이고 장황해지겠죠. 이때 사용할 수 있는 것이 `map` 헬퍼입니다. `map` 헬퍼는 상태뿐만 아니라 스토어의 모든 속성을 위해 사용할 수 있습니다.

```javascript
import { mapState } from 'vuex';
export default {
  // ...
  computed: {
    ...mapState({
      // 화살표 함수를 사용하거나,
      count: state => state.count,
      // 문자열로 상태를 가져올 수 있어요
      countAlias: 'count',
    }),
  },
  // ...
};
```

### 3. Getters

때로는 스토어의 상태를 기반으로 다른 상태 값을 계산해야 할 수도 있어요. 이럴 때 사용할 수 있는 것이 **getters**입니다. 게터는 스토어의 `computed` 속성이라고 생각하면 쉬워요.

```javascript
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {
    twice: state => state.count + state.count,
    threeTimes: (state, getters) => getters.twice + state.count,
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
  },
});
```

```html
<template>
  <div id="app">
    <p>{{count}}</p>
    <p>{{twice}}</p>
    <p>{{threeTimes}}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  export default {
    // ...
    computed: {
      ...mapState({
        // 화살표 함수를 사용하거나,
        count: state => state.count,
        // 문자열로 상태를 가져올 수 있습니다
        countAlias: 'count',
      }),
      // 스토어에서 선언한 이름 그대로 사용한다면
      // 배열을 이용해 간편하게 상태를 가져올 수 있어요
      ...mapGetters(['twice', 'threeTimes']),
    },
    // ...
  };
</script>
```

### 4. Mutations

스토어의 상태를 변경하는 유일한 방법은 **변이**하는 것입니다.

스토어의 mutations에는 여러 변이 핸들러를 선언할 수 있습니다. 이 핸들러 함수는 첫 번째 인자로 언제나 상태를 받으며 코드 내에서 해당 상태를 변경합니다. 변이 핸들러 함수는 직접 호출할 수 없으며, 핸들러 타입과 함께 `store.commit`을 호출해야 합니다.

카운터 앱에서는 이미 `increment`와 `decrement`라는 변이 핸들러들을 커밋했었죠. 그런데 변이 핸들러에 전달인자가 필요한 경우에는 어떻게 커밋할까요?

```javascript
// ...
mutations: {
  increment: (state, num) => (state.count += num);
}
```

```javascript
store.commit('increment', 10);
```

두 번째 인자로 값을 전달하면 됩니다. 간단하죠! 👍

#### 4.1 반응성 규칙

Vuex 스토어의 상태는 Vue에 의해 반응하므로, 상태를 변경하면 상태를 관찰하는 Vue 컴포넌트가 자동으로 업데이트됩니다. 때문에 Vuex 변이 또한 **Vue의 반응성 규칙을 따릅니다.**

만약 스토어의 객체 상태에 새 속성을 추가하려면 어떻게 해야할까요? Vue와 마찬가지로 `Vue.$set(obj, 'newProp', value)` 전역 API를 사용하여 해결할 수 있습니다.

### 5. Actions

액션은 변이와 유사합니다. 다만 변이와는 다르게 직접 상태를 수정하지 않고 변이를 커밋하며 **비동기 작업이 포함**될 수 있습니다.

간단한 액션을 등록해 볼까요?

```javascript
const store = new Vuex.Store({
  // ...
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
  },
});
```

액션 핸들러는 저장소 인스턴스의 메서드들과 속성들을 갖는 `context` 객체를 첫 번째 인자로 받습니다. 그래서 `context.commit`을 호출하여 변이를 커밋하거나 `context.state`와 `context.getters`를 통해 상태와 getters에 접근할 수 있습니다.

액션은 `store.dispatch` 메서드로 시작됩니다. 바로 이렇게요!

```html
<script>
  export default {
    // ...
    methods: {
      increment() {
        this.$store.dispatch('increment');
      },
      // ...
    },
  };
</script>
```

위에서 언급한 `map` 헬퍼를 사용하면 좀 더 간단하게 액션을 사용할 수도 있어요.

```html
<script>
  import { mapActions } from 'vuex';
  export default {
    // ...
    methods: {
      // this.increment() 메서드를
      // this.$store.dispatch('increment')에 매핑
      ...mapActions(['increment']),
    },
  };
</script>
```

#### 5.1 비동기 작업

사실 액션을 사용하는 가장 큰 이유는 바로 비동기 작업이죠. 그러면 비동기 작업 시 액션이 언제 완료되었는지 어떻게 알 수 있을까요?

먼저 `Promise` 객체를 사용해서 처리할 수 있어요.

```javascript
actions: {
  actionA({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation');
        resolve();
      }, 1000);
    })
  }
}
```

이제 `store.dispatch('actionA').then(() => {})`으로 비동기 작업이 가능합니다! 혹은 액션 안에 다른 액션을 사용할 수도 있고요. 아래 코드는 `Promise` 객체 대신 `async/await` 키워드를 사용했습니다.

```javascript
actions: {
  // ...
  async actionB({dispatch, commit}) {
    await dispatch('actionA');
    commit('someOtherMutation', await getData());
  }
}
```

### 6. 모듈

Vuex는 스토어를 모듈로 나눌 수 있어요. 각 모듈은 자체 상태, 변이, 액션, 게터 심지어 중첩된 모듈을 포함할 수 있습니다.

```javascript
const moduleA = {
  // ...
};

const moduleB = {
  // ...
};

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB,
  },
});

store.state.a; // -> moduleA'의 상태
store.state.b; // -> moduleB'의 상태
```

#### 6.1 지역 상태

모듈의 변이와 게터 내부에서 첫 번째 전달인자는 모듈의 지역 상태를 참조합니다.

```javascript
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment: state => state.count++,
  },
};
```

모듈의 액션에서 `context.state`는 지역 상태를 나타내고, `context.rootState`는 **루트 상태**를 나타냅니다.

```javascript
const moduleA = {
  // ...
  actions: {
    incrementIfOddRootSum({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) commit('increment');
    },
  },
};
```

유사하게 모듈 내부 게터는 **세 번째 인자로 루트 상태**를 받습니다.

```javascript
const moduleA = {
  // ...
  getters: {
    sumWithRootCount(state, getters, rootState) {
      return state.count + rootState.count;
    },
  },
};
```

#### 6.2 네임 스페이스

기본적으로 모듈 내의 액션, 변이 및 게터는 여전히 **전역 네임 스페이스** 아래에 등록됩니다. 때문에 여러 모듈이 동일한 변이/액션 유형에 반응할 수 있습니다.

만약 모듈이 독립적이거나 재사용되기를 원한다면 `namespaced: true`라고 명시하면 됩니다.

### 7. 플러그인

Vuex 저장소는 각 변이에 대한 훅을 노출하는 `plugins` 옵션을 허용합니다.

### 8. 폼 핸들링

Vuex에 포함된 부분에 `v-model`을 사용하는 것은 약간 까다로울 수 있습니다. 😅

```html
<input v-model="obj.message" />
```

위 예시에서 `obj`가 저장소에서 객체를 반환하는 `computed` 속성이라면, 여기에 있는 `v-model`은 사용자가 입력할 때 `obj.message`를 직접 변경하려고 합니다.

이럴 때는 `<input>`의 값을 바인딩하고 `input` 또는 `change` 이벤트에서 액션을 호출하는 것으로 해결할 수 있습니다.

```html
<input :value="message" @input="updateMessage" />
```

```javascript
// ...
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage(value) {
    this.$store.commit('updateMessage', value);
  }
}
```

`v-model`을 계속 사용하고 이러한 문제를 해결할 수 있는 방법은 없을까요? 좀 더 간단한 방법을 원한다면 `setter`를 사용하면 됩니다.

```html
<input v-model="message" />
```

```javascript
// ...
computed: {
  message: {
    get() {
      return this.$store.state.obj.message
    },
    set(value) {
      this.$store.commit('updateMessage', value);
    }
  }
}
```
