## Information

`icon` 그림들 얻은 곳 : [mui](https://mui.com/material-ui/material-icons/)

`font` 사용한 곳 : [구글 폰트](https://fonts.google.com/specimen/Urbanist)

* **Urbanist** 글꼴 사용

`사용자 스타일 태그`는 **@emotion**으로 styled 사용

`yarn` 사용

예전버전의 `CRA` 사용

<br>

## Folder Structure

* [`/src/App.jsx`](./src/App.jsx)
  * 프로젝트의 루트 컴포넌트
* [`/src/pages/Home.jsx`](./src/pages/Home.jsx)
  * 웹의 첫 페이지를 의미하며, 위에서 부터 차례로
  * `Announcement, Navbar, Slider, Categories, Products, Newsletter, Footer` 로 구성
* [`/src/components/Announcement.jsx`](./src/components/Announcement.jsx)
  * 웹의 맨 위에 있는 광고 메시지 같은 알림 베너와 같다
* [`/src/components/Navbar.jsx`](./src/components/Navbar.jsx)
  * 웹의 상단에 검색창, 회원가입, 로그인, 장바구니 등등의 표시들을 나타낸다
* [`/src/components/Slider.jsx`](./src/components/Slider.jsx)
  * 웹의 그림들을 왼쪽, 오른쪽 화살표 버튼을 클릭해서 슬라이더처럼 넘길수 있다.
  * 이때, 전체 크기만큼 넘기기위해 `100vw` 를 사용한다.
  * 또한, `useState` 를 사용해서 크기 계산을 위한 `index`를 구한다.
* [`/src/components/Categories.jsx`](./src/components/Categories.jsx)
  * 웹에서 카테고리를 의미하며, `cover`등 그림을 맞추는 효과적인 속성들을 다룬다.
  * 또한, `map함수`를 다뤄서 `더미 데이터`를 이용해 카테고리를 추가한다.
* [`/src/data.js`](./src/data.js)
  * `더미 데이터` 를 의미하며, 실제 데이터가 아닌 테스트용 데이터이다.
* [`/src/components/CategoriyItem.jsx`](./src/components/CategoriyItem.jsx)
  * 위의 `Categories.jsx` 의 자식이며, 위에서 `map함수`를 통한 데이터 개수만큼 생성된다.
  * `flex:1` 로 설정되었기 때문에 생성될때마다 1:1:1...비율로 공간을 알맞게 할당이 가능하다.
* [`/src/components/Products.jsx`](./src/components/Products.jsx)
  * 웹에서 판매하는 제품들을 의미하며, 이또한 `Categories.jsx` 처럼 `map함수`를 다룬다.
* [`/src/components/Product.jsx`](./src/components/Product.jsx)
  * 위의 `Products.jsx` 의 자식이며, 위에서 `map함수`를 통한 데이터 개수만큼 생성된다.
  * `애니메이션` 도 조금 다루며, `position`을 통해 공간을 겹쳐서 사용하기도 한다.
  * `z-index` 는 겹친 상태에서 뒤로 감춰진것을 앞으로 나타낼 수 있다. 

* [`/src/components/Newsletter.jsx`](./src/components/Newsletter.jsx)
  * 이메일 보내는 부분을 나타낸다.
* [`/src/components/Footer.jsx`](./src/components/Footer.jsx)
  * 웹에서 제일 하단부분을 의미하며,  
    내용중에서 `flex-wrap: wrap` 을 통해서 긴 내용은 다음 줄로 넘긴다.
* [`/src/pages/Register.jsx`](./src/pages/Register.jsx)
  * 회원가입 화면이며, 배경사진을 `cover`를 활용해 적절히 구성하였다.
* [`/src/pages/Login.jsx`](./src/pages/Login.jsx)
  * 로그인 화면이며, 배경사진을 `cover`를 활용해 적절히 구성하였다.
* [`/src/pages/Cart.jsx`](./src/pages/Cart.jsx)
  * 장바구니 화면이며, 왼쪽에 제품과 오른쪽에 계산서로 구성하였다.
* [`/src/pages/ProductList.jsx`](./src/pages/ProductList.jsx)
  * 제품들을 카테고리, 사이즈, 색깔, 정렬 등으로 필터링해서 나타낸 제품들 페이지이다.
* [`/src/pages/Product.jsx`](./src/pages/Product.jsx)
  * `ProductList.jsx` 에서 나타낸 제품들을 클릭하면, 해당 화면이 나타나는 페이지이다.
  * 제품들의 자세한 설명 및 속성과 장바구니에 추가하는 등으로 구성하였다.
* [`/src/responsive.js`](./src/responsive.js)
  * 컴퓨터, 태블릿, 스마트폰 등등의 화면마다 웹이 나타나는 모습이 다를것이다.
  * 따라서 이를 해결하기 위해 추가한 해결 방안이다(물론 예시로 phone만 간략히 다뤘음)







