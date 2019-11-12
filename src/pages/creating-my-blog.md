---
title: 'Gatsby로 블로그 만들기'
date: '2019-11-10'
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

개발 서버를 구동하게 되면 **http://localhost:8000/**에서 생성된 사이트를 확인할 수 있습니다. 👀 개발 서버 구동 시에는 **watched** 상태이므로 파일 수정 뒤 저장하기만 하면 즉시 브라우저에 반영됩니다! 😊

### Gatsby에서 Styled Components 사용하기

1. `npm i gatsby-plugin-styled-components styled-components babel-plugin-styled-components`로 Styled Components를 설치합니다.
2. `gatsby-config.js`파일의 `plugins` 배열에 `gatsby-plugin-styled-components`를 추가합니다.

### Styled Components를 사용해서 테마 스위치 기능 추가하기
