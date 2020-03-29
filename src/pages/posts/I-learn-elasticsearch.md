---
# type: 'post'
title: 'Elasticsearch 시작하기'
date: '2020-01-12'
tags: ['Elasticsearch']
---

Elasticsearch는 검색엔진이지만, NoSQL처럼 사용할 수 있습니다. 데이터 모델은 JSON으로 요청과 응답을 모두 JSON 문서로 주고 받습니다.

## What is Elasticsearch?

**Elasticsearch**는 apache Lucene을 기반으로 구축된 텍스트, 숫자, 위치 기반 정보, 정형 및 비정형 데이터 등 모든 유형의 데이터를 위한 분산형 오픈 소스 검색 및 분석 엔진이라고 합니다. Elasticsearch는 현재 가장 인기있는 검색엔진으로 fulltext search, 로그 분석 등 다양한 분야에서 사용되고 있습니다.

현재 개발에 참여하고 있는 애플리케이션 검색 기능 또한 elasticsearch를 사용하고 있더라고요. 알아두면 좋을 것 같아, 이번 기회에 간단하게나마 정리해보기로 했습니다! 😊

## Installing the Elasticsearch

[공식 홈페이지](https://www.elastic.co/)에서 다운로드할 수 있습니다. 오픈 소스로 기본적으로 무료로 사용할 수 있습니다! 어러 가지 버전으로 다운로드가 가능한데요, 저는 윈도우에서 localhost로 간단하게 elasticsearch가 무엇인지 맛만 볼 예정이기에, window 버전을 다운로드했습니다.

적당한 위치에 압축을 풀고 콘솔에 다음과 같이 입력하면 elasticsearch가 시작됩니다. 저는 C 드라이브에 압축을 풀었습니다.

```bash
cd c:\elasticsearch-7.6.0
$ .\bin\elasticsearch.bat
```

`localhost:9200`으로 접속 후 아래와 같은 응답을 받았다면, elasticsearch가 구동에 성공한 것입니다.

```json
{
  "name" : "Cp8oag6",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "AT69_T_DTp-1qgIJlatQqA",
  "version" : {
    "number" : "7.6.0",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "f27399d",
    "build_date" : "2016-03-30T09:51:41.449Z",
    "build_snapshot" : false,
    "lucene_version" : "8.4.0",
    "minimum_wire_compatibility_version" : "1.2.3",
    "minimum_index_compatibility_version" : "1.2.3"
  },
  "tagline" : "You Know, for Search"
}
```

## Elasticsearch Java Client

