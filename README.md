## Information

**Mern이란?**  `MongoDB, Express, React, Node.js` 를 뜻하며  
이 네가지 요소를 사용해 웹사이트 개발을 의미

이전 커밋과 비교해서 수정된 부분만 확인하면 됨.

`yarn add react-router-dom` - 라우터 추가

`yarn add @reduxjs/toolkit react-redux` - 리덕스 추가

* `yarn add redux-persist` - 새로고침시 데이터 사라지지 않게
* 덕분에 user 데이터 사라지지 않고 사용(토큰도 포함되어 있음)

`yarn add timeago.js` - 1달전..2주전.. 이런식으로 표현하는 날짜 format 사용

<br>

## Folder Structure

* [admin](/admin)
  * index.js에 redux(+persist)가 추가되었고
  * App.js에 여긴 이전부터 라우터로 감싸져 있었다.
  * requestMethods.js에서 크롬-F12-Application으로 localstorage들 확인 TOKEN 잘 가져옴
* [api](/api)
  * 거희 이전과 유사
* [client](/client)
  * index.js에 redux(+persist)가 추가되었고
  * App.jsx에 라우터가 새로 추가되었다.
  * requestMethods.js에서 크롬-F12-Application으로 localstorage들 확인 TOKEN 잘 가져옴

<br>

## 마무리

[참고 사이트](https://www.youtube.com/watch?v=y66RgYMAgSo&list=PLjNzq0dzIM348Fh3HdTLBgb4gmXFLN_85&index=5&t=5504s) - 어떤 내용인지 확인

실행은 api, client 따로 yarn start로 구동하면 됨(포트 다름)



