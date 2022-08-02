## Information

`icon` 그림들 얻은 곳 : [mui](https://mui.com/material-ui/material-icons/)

* `data table` 또한 mui 여기서 라이브러리 사용하였다.  
  => 직접 테이블 설계는 귀찮고 이미 이쁜게 있으니 사용하는것

`사용자 스타일 태그`는 **@emotion**으로 styled 사용

* 다만, 여기선 **styled** 를 활용한것이 아닌 css로 스타일링 하였다.

`yarn` 사용

* install : [mui_install](https://mui.com/material-ui/getting-started/installation)
* `yarn add @mui/material @mui/icons-material @emotion/react @emotion/styled`

`리액트의 라우터`를 사용

* `yarn add react-router-dom`

`font` 사용한 곳 : [구글 폰트](https://fonts.google.com/specimen/Urbanist)

* **source** 글꼴 사용

`recharts` 차트 사용한 곳 : [rechart](https://recharts.org/en-US/guide/installation)

`box-shadow` 그림자 속성 직접 커스텀 : [box-shadow](https://html-css-js.com/css/generator/box-shadow/)

현재의 `CRA` 사용

* `npx create-react-app`

<br>

## Folder Structure

* [`/src/App.js`](./src/App.js)
  * 프로젝트의 루트 컴포넌트(라우터로 구성)
  * [`/src/app.css`](./src/app.css)
  * App.js에 반영될 css이며 App.js와 함께 화면 배치를 진행 하였다

* [`/src/components/topbar/Topbar.jsx`](./src/components/topbar/Topbar.jsx)
  * [`/src/components/topbar/topbar.css`](./src/components/topbar/topbar.css)
  * 페이지의 맨 위 상단에 고정된 메뉴바이다

* [`/src/components/sidebar/Sidebar.jsx`](./src/components/sidebar/Sidebar.jsx)
  * [`/src/components/sidebar/sidebar.css`](./src/components/sidebar/sidebar.css)
  * 페이지의 맨 왼쪽에 고정된 사이드 메뉴바이다
* [`/src/pages/home/Home.jsx`](./src/pages/home/Home.jsx)
  * [`/src/pages/home/home.css`](./src/pages/home/home.css)
  * 메인 페이지인 Home 페이지이다
  * `FeaturedInfo, Chart, WidgetSm, WidgetLg` 로 구성되어있다
* [`/src/components/featuredInfo/FeaturedInfo.jsx`](./src/components/featuredInfo/FeaturedInfo.jsx)
  * [`/src/components/featuredInfo/featuredInfo.css`](./src/components/featuredInfo/featuredInfo.css)
  * 수익, 판매가 등등 정보를 나타낸 부분이다
* [`/src/components/chart/Chart.jsx`](./src/components/chart/Chart.jsx)
  * [`/src/components/chart/chart.css`](./src/components/chart/chart.css)
  * recharts 라이브러리를 활용해서 나타낸 유저 분석 차트이다
* [`/src/components/widgetSm/WidgetSm.jsx`](./src/components/widgetSm/WidgetSm.jsx)
  * [`/src/components/widgetSm/widgetSm.css`](./src/components/widgetSm/widgetSm.css)
  * 새로운 방문자를 확인할 수 있는 위젯을 만든 차트 하단의 왼쪽 부분이다
* [`/src/components/widgetLg/WidgetLg.jsx`](./src/components/widgetLg/WidgetLg.jsx)
  * [`/src/components/widgetLg/widgetLg.css`](./src/components/widgetLg/widgetLg.css)
  * 최근 거래내역을 나타낸 위젯이며 차트 하단의 오른쪽 부분이다
* [`/src/pages/userList/UserList.jsx`](./src/pages/userList/UserList.jsx)
  * [`/src/pages/userList/userList.css`](./src/pages/userList/userList.css)
  * mui 사이트에서 data table 라이브러리를 활용해서 유저 정보들 나타낸 페이지이다
* [`/src/pages/user/User.jsx`](./src/pages/user/User.jsx)
  * [`/src/pages/userList/user.css`](./src/pages/userList/user.css)
  * **UserList** 에서 edit버튼 눌렀을때 들어가는 페이지이며, 유저 정보를 수정하는 페이지이다
* [`/src/pages/newUser/NewUser.jsx`](./src/pages/newUser/NewUser.jsx)
  * [`/src/pages/newUser/newUser.css`](./src/pages/newUser/newUser.css)
  * **User** 에서 create버튼 눌렀을때 들어가는 페이지이며, 유저를 새로 생성하는 페이지이다
* [`/src/pages/productList/ProductList.jsx`](./src/pages/productList/ProductList.jsx)
  * [`/src/pages/productList/productList.css`](./src/pages/productList/productList.css)
  * **UserList** 와 유사한 페이지이며, 유저정보가 아닌 제품 정보이다
* [`/src/pages/product/Product.jsx`](./src/pages/product/Product.jsx)
  * [`/src/pages/product/product.css`](./src/pages/product/product.css)
  * **User** 와 유사한 페이지이며, 유저정보가 아닌 제품 정보이다
* [`/src/pages/newProduct/NewProduct.jsx`](./src/pages/newProduct/NewProduct.jsx)
  * [`/src/pages/newProduct/newProduct.css`](./src/pages/newProduct/newProduct.css)
  * **newUser** 와 유사한 페이지이며, 유저정보가 아닌 제품 정보이다

* [`/src/dummyData.js`](./src/dummyData.js)
  * 테스트를 위한 데이터 모음일 뿐이다

