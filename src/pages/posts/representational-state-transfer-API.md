---
# type: 'post'
title: 'REST API에 대하여'
date: '2019-12-03'
tags: ['REST API']
---

[REST API 제대로 알고 사용하기](https://meetup.toast.com/posts/92)를 보고 공부한 내용입니다. 👩‍💻

## Representational State Transfer API

**REST**는 아파치 HTTP 서버 프로젝트의 공동설립자인 로이 필딩(Roy Fielding)의 2000년 논문에서 처음 소개되었습니다. 발표 당시의 웹이 HTTP의 설계 상 우수성을 제대로 사용하지 못하고 있는 상황을 보고 **웹의 장점을 최대한 활용할 수 있는 아키텍처**로써 REST를 소개한 것입니다. REST는 HTTP 프로토콜을 의도에 맞게 디자인하도록 유도하고 있습니다. REST의 기본 원칙을 성실히 지킨 서비스 다자인을 **RESTful**이라 표현하곤 합니다.

### REST의 특징

1. **Uniform:** Uniform Interface는 URI로 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행하는 아키텍처 스타일을 말합니다.

2. **Stateless:** REST는 무상태성 성격을 갖습니다. 다시 말해 작업을 위한 상태정보를 따로 저장하고 관리하지 않습니다.
