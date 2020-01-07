---
type: 'post'
title: 'noopener & noreferrer'
date: '2019-11-27'
tags: ['HTML']
---

아래 내용은 [Tabnabbing 공격과 rel=noopener 속성](https://blog.coderifleman.com/2017/05/30/tabnabbing_attack_and_noopener/)을 참고하여 공부한 내용을 정리한 것입니다. 🙋‍♀️

## Tabnabbing 공격

Tabnabbing 공격이란, HTML 문서 내에서 `target`이 `_blanck`인 링크를 클릭했을 때 새롭게 열린 탭(또는 페이지)에서 기존 문서의 location을 피싱 사이트로 변경해 정보를 탈취하는 공격 기술을 뜻합니다. 이 공격은 메일 등에서 쉽게 사용될 수 있습니다.

### 공격 절차

1. 사용자가 `aaa.example.com`에 접속합니다.
2. 해당 사이트에서 `link.example.com`으로 연결된 외부 링크를 클릭합니다.
3. 새 탭으로 `link.example.com`이 열립니다. 이때 `link.example.com`에는 window.opener속성이 존재하여 opener의 location을 피싱 목적의 `phishing.example.com/login`으로 변경됩니다.
4. 사용자는 다시 본래의 탭으로 돌아옵니다.
5. 로그인이 풀렸다고 생각하고 아이디와 비밀번호를 입력합니다. `phishing.example.com`은 해당 계정 정보를 탈취한 후 다시 본래의 사이트로 redirect 합니다.

## noopener 속성

이러한 공격의 취약점을 극복하고자 `noopener` 속성이 추가되었습니다.

이 속성이 부여된 링크를 통해 열린 페이지는 opener의 location 변경과 같은 자바스크립트 요청을 거부합니다. 정확히 말해 `Uncaught TypeError`를 발생시키게 됩니다.

`noopener` 속성은 보안적 측면 외에도 성능 상의 이점도 취할 수 있는데, `_blank` 속성으로 열린 탭(페이지)는 언제든지 opener를 참조할 수 있으므로 부모 탭과 같은 스레드에서 페이지가 동작하게 됩니다. 이때 새 탭의 페이지가 리소스를 많이 사용한다면 덩달아 부모 탭도 함께 느려지게 됩니다. 그러나 noopener 속성을 사용해 열린 탭은 부모 탭을 호출할 일이 없으므로 같은 스레드 일 필요가 없으며 새로운 페이지가 느리다고 부모 탭까지 함께 느려질 일도 없게 됩니다.

## noreferrer 속성

`noreferrer` 속성은 링크를 클릭했을 때 참조하는 정보를 숨겨줍니다.
