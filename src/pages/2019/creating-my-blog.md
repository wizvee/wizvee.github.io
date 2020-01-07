---
type: 'post'
title: 'Gatsby로 블로그 생성'
date: '2019-11-10'
tags: ['React', 'Gatsby']
---

개발자의 길을 걷기로 하면서 개발만을 위한 블로그의 필요성은 계속 느끼고 있었어요. 특히 교육원 수료를 코앞에 둔 현재, 프런트엔드 개발자로서 커리어를 쌓아가기로 결심했기에 포트폴리오를 겸한 블로그가 더욱 절실해지기도 했습니다. 개발자 꿈나무이니만큼 처음부터 끝까지 나만의 스타일을 반영한 블로그를 직접 만들어보고 싶었기에 GitHub Pages와 Gatsby를 활용하여 나만의 블로그를 만들어보기로 했습니다. 👏

## Gatsby를 선택한 이유

Gatsby는 리액트 기반의 정적 페이지 생성기라고 합니다. 흔히 GitHub Pages로 블로그를 만들기 위해 사용하는 Jekyll과 유사합니다. 다만 Jekyll은 Ruby를 기반으로 한다는 큰 차이점이 있습니다. 현재 리액트를 공부 중이니 만큼, Gatsby로 블로그를 차근차근 만들어가면서 리액트 실력도 함께 쌓기 위해 Gatsby를 블로그 생성기로 선택하게 되었습니다.

## 프로젝트 시작

[Gatsby Tutorial](https://www.gatsbyjs.org/tutorial/part-zero/)를 참고하여 프로젝트를 시작하였습니다.

### Gatsby site 생성하기

```bash
$ npm i -g gatsby-cli # gatsby-cli을 설치합니다.
$ gatsby new [title] # Gatsby site를 생성합니다.
$ cd [title]
$ gatsby develop # 개발 서버를 구동합니다.
```

개발 서버를 구동하게 되면 **http://localhost:8000/**에서 생성된 사이트를 확인할 수 있습니다. 👀 개발 서버에선 **watched** 상태이므로 파일 수정 뒤 저장하기만 하면 즉시 브라우저에 반영됩니다! 😊

### Gatsby에서 Styled Components 사용하기

Styled Components를 설치합니다.

```bash
$ npm i gatsby-plugin-styled-components styled-components babel-plugin-styled-components
```

plugins 배열에 Styled Components를 추가합니다.

```json
// gatsby-config.js
plugins: [
  `gatsby-plugin-styled-components`,
]
```

## 테마 스위치 기능 추가하기

[A Dark Mode Toggle with React and ThemeProvider](https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/)을 참고하여 적용하였습니다.

### 테마 객체 생성하기

우선 적합한 js 파일 내에 테마 객체를 생성합니다. 이번 경우 제 블로그는 그리 복잡한 구조가 아니므로 `Layout.js` 문서 내에 생성하였습니다.

이후 `createGlobalStyle` 컴포넌트를 이용하여 `props`로 설정된 테마의 스타일을 적용하도록 합니다.

```javascript
import { createGlobalStyle } from 'styled-components'

// 테마 객체 생성
export const darkTheme = {
  body: '#292d3e',
  text: '#b2ccd6',
  primary: '#c792ea',
  second: '#f9c76a',
  third: '#c3e88d',
}

export const lightTheme = {
  body: '#f3f2e9',
  text: '#775f59',
  primary: '#ff6969',
  second: '#f7a54a',
  third: '#98c05d',
}

(...)

// 글로벌 스타일 설정
const GlobalStyle = createGlobalStyle`
 body {
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  (...)
 }
`
```

### 테마 스위칭 기능 추가하기

컴포넌트 내에 `useState`를 이용하여 테마를 위한 상태를 관리합니다.

만약 브라우저를 새로고침하거나 껐다 켜도 스위치한 테마를 남기고 싶을 경우 웹 스토리지를 이용해 저장한 뒤 `useEffect`를 이용하여 컴포넌트가 처음 마운트될 때 테마에 적용되도록 합니다.

이렇게 블로그에 테마 스위칭 기능을 추가하였습니다! 😁

```javascript
const [theme, setTheme] = useState(darkTheme);

const Layout = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);

  const onToggle = () => {
    if (theme === lightTheme) {
      localStorage.setItem('theme', 'dark');
      return setTheme(darkTheme);
    } else {
      localStorage.setItem('theme', 'light');
      return setTheme(lightTheme);
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme == 'light') setTheme(lightTheme);
    else setTheme(darkTheme);
  }, []);

  return (
    <>
      <GlobalStyle theme={theme} />
      <Header theme={theme} onToggle={onToggle} />
      {children}
    </>
  );
};
```

### 기기 설정에 따라 동적으로 테마 적용

최신 웹 표준 브라우저에서 지원하는 미디어 쿼리의 `prefers-color-scheme`를 이용하여 기기 설정에 따라 웹 애플리케이션에 동적으로 테마를 적용하였습니다.

```javascript
useEffect(() => {
  const theme = localStorage.getItem('theme');
  if (theme) {
    if (theme === 'light') setTheme(lightTheme);
    else setTheme(darkTheme);
  } else {
    // 웹 스토리지에 'theme'가 없을 경우 기기 설정에 따름
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      setTheme(darkTheme);
    else setTheme(lightTheme);
  }
}, []);
```

## 태그 기능 추가하기

[Creating Tags Pages for Blog Posts](https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/)를 참고하여 적용하였습니다. 다만 참고한 공식 문서는 태그 별 페이지로 전환되지만, 저는 `velog`와 같이 카테고리 같은 느낌을 원했기에… 결과물은 조금 다릅니다. 😋

우선 markdown 문서를 작성할 때에 frontmatter에 tags를 추가해 줍니다.

```markdown
---
type: 'post'
title: 'Gatsby로 블로그 생성'
date: '2019-11-10'
tags: ['React', 'Gatsby']
---
```

그리고 graphql 쿼리에 아래와 같이 추가하면 모든 markdown 문서의 태그들을 조회할 수 있습니다.

```javascript
export const query = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;
```

이후 과정은 Gatsby의 공식 문서처럼 템플릿을 이용해 태그 별 조회 페이지를 만들 수도 있고, 제 블로그처럼 카테고리처럼 활용하셔도 무방합니다! 제 블로그는 `useState`로 해당 기능을 구현했습니다.