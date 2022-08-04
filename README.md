## Information

`NodeJS` 활용(CRA가 아님)이므로 APP.js가 없음

**Rest API이란?** [Rest API 게시글](/knowledge/GraphQL,-RestAPI/)  

* `Express 라이브러리` 활용해서 **서버 구동 및 Router** 함수 활용
  * `react-router-dom 라이브러리`를 활용한 것이 아닌 `Express 라이브러리`의 Router() 메소드 사용  
    [react-router-dom 게시글]() 참고
  * 즉, CRA처럼 리액트로 개발하는것이 아닌 Node js로 개발
* `MongoDB` 는 MySQL처럼 Database역할을 한다(NoSQL)  
  [MongoDB 사이트](https://cloud.mongodb.com) 참고 및 Node.js 와 connect
* 로그인 인증으로 `JWT` 방식의 토큰 활용
  * 로그인 정보 암호화 위한 해시 방식의 `CryptoJS` 활용
* `CRUD with JWT` 로 Rest API 구성 마무리

**API 구성을 위한 설치할 것들**

* `npm init`
* `yarn add express mongoose dotenv nodemon crypto-js jsonwebtoken`
  * `dotenv` 이란 env를 통해 보안키 같은것을 숨기기위한 라이브러리  
    React의 CRA에선 바로 env, gitignore활용 했는데, 이 방식도 있다는걸 참고
  * `nodemon` 이란 핫라인 같은 느낌으로 터미널 입력(node index.js)이 아닌, 코드 수정시 바로 반영.  
    `Code Runner 플러그인` 도 있긴 하지만, `nodemon` 도 충분히 편리해 보임.  
    **사용법**은 package.json에 `"start": "nodemon index.js"` 하고 터미널에 yarn start
  * `crypto-js` 란 암호화 하는 라이브러리라고 생각
  * `jsonwebtoken` 란 JWT를 활용하게 해주는 라이브러리이다.
* 추가로 `Postman` 활용해서 api 구동 확인하는것 추천

<br>

## Folder Structure

* [`/src/index.js`](./src/index.js)
  
  * 프로젝트의 루트 컴포넌트
  * RestAPI 구조를 띄는중(+몽고DB 연결)
  * start point(라우터)
  
* [`/src/models/Cart.js`](./src/models/Cart.js)

  * 장바구니를 위한 DB 구조를 구성한다.

* [`/src/models/Order.js`](./src/models/Order.js)

  * 주문관련 주소 등 DB 구조를 구성한다

* [`/src/models/Product.js`](./src/models/Product.js)

  * 제품 정보를 나타내기 위한 DB 구조를 구성한다

* [`/src/models/User.js`](./src/models/User.js)

  * 사용자 정보관련 DB 구조를 구성한다

* [`/src/routes/verifyToken.js`](./src/routes/verifyToken.js)

  * 회원 인증 관련 js 파일이다.
  * JWT 토큰으로 인증한다.

* [`/src/routes/auth.js`](./src/routes/auth.js)

  * REGISTER, LOGIN 관련 동작 api
  * CryptoJS.AES 방식으로 암호화 하고있다.

  * end point(라우터)

* [`/src/routes/cart.js`](./src/routes/cart.js)

  * 장바구니 CREATE, UPDATE, DELETE 등등 동작 api
  * end point(라우터)

* [`/src/routes/order.js`](./src/routes/order.js)

  * 제품 주문 CREATE, UPDATE, DELETE 등등 동작 api

  * end point(라우터)

* [`/src/routes/product.js`](./src/routes/product.js)

  * 제품 CREATE, UPDATE, DELETE 등등 동작 api

  * end point(라우터)

* [`/src/routes/user.js`](./src/routes/user.js)

  * 사용자 UPDATE, DELETE 등등 동작 api

  * end point(라우터)
