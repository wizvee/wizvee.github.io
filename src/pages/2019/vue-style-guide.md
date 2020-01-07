---
type: 'post'
title: 'Vue 스타일 가이드 정리'
date: '2019-12-19'
tags: ['Vue']
---

해당 포스팅은 개인적으로 참고하기 위해 [Vue 스타일 가이드](https://kr.vuejs.org/v2/style-guide/index.html)를 정리한 글입니다. 🙋‍♀️ 그러므로 중요도나 순서보다는 저에게 정리가 필요했던 내용을 위주로 서술되어 있습니다. 😊

## How to Structure Components

리액트에서 컴포넌트는 **Container와 Presentational**, 두 종류로 구분합니다. **Container 컴포넌트**는 state의 변화를 조종하고 이에 반응합니다. 반면 **Presentational 컴포넌트**는 state와 관련이 없으며 오로지 보여지는 요소에만 집중합니다.

**MVC** pattern과 비교하자면, conatiner는 Controller, presentational는 View와 비슷하다고 볼 수 있습니다.

리액트에서는 container와 presentational을 다른 폴더에 생성합니다. 그러나 뷰에서는 이를 구분하지 않고 같은 `components` 폴더에 생성합니다.

## Vue Style Guide

### Base component names

**Base 컴포넌트**(a.k.a presentational)에는 특정한 접두어를 붙입니다.

```bash
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

### Single-instance component names

단일로 활용되는 컴포넌트에는 `The` 접두어를 붙입니다. 이때 대상이 되는 컴포넌트는 단일 페이지에서만 사용되는 컴포넌트를 뜻하는 것은 아닙니다. **페이지마다 오직 한 번만 쓰이는 컴포넌트**를 대상으로 합니다.

```bash
components/
|- TheHeading.vue
|- TheSidebar.vue
```

### Tightly coupled component names

Children 컴포넌트의 이름은 parent 컴포넌트의 이름과 단단히 결합되어야 합니다. 보통은 **parent 컴포넌트의 이름을 접두어로** 붙입니다.

```bash
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue

components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

### Order of words in component names

컴포넌트 이름에는 형용사 같은 서술어는 뒤로 명사의 뒤에 위치하도록 합니다. 이는 구분하기 쉽게 파일을 정렬하도록 합니다.

```bash
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

### Prop name casing

Prop 이름은 **선언할 때는 camelCase**로, **JSX에서 사용할 때는 kebab-case**를 사용합니다.

```javascript
props: {
  greetingText: String;
}
```

```HTML
<WelcomeMessage greeting-text="hi"/>
```

### Multi-attribute elements

다중 속성을 가진 컴포넌트를 사용할 때는 여러 줄로 작성하여 가독성을 좋게 합니다.

```HTML
<my-component
  foo="a"
  bar="b"
  baz="c"
/>
```
