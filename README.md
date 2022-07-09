**실행화면 : [URL](https://bh946.github.io/React_Naver_Movie_API/)**



## 기본 필요지식, 기초

**git bash로 npx create-react-app 폴더명 으로 설치**

* 폴더 구성에서 **src 폴더 하위에 새로운 코드들 작성**할것. import시 src를 기본으로 경로 잡기 때문

* public 폴더에는 이미지 등 정적 파일들 작성할 것.



**네이버 사이트에서 api 키 얻기** 

* **env**파일 만들어서 넣어서 사용(git에 안올라가기위해)

* 우선 api요청 테스트 하기위해 [`/src/components/RequestTest.jsx`](./src/components/RequestTest.jsx)로 수행하였다.
  * 이후부턴 **fetch.js**로 다시 세분화 해서 코드 작성하였다.
  * api요청을 위해 다양한 Tool이 있는데 여기선 코드로 확인해본것.



**index.js에 <React.StrictMode>를 사용해서 useEffect를 써도 mount시 console두번 찍히는 문제 발견.**

* 임시방편으로 **\<div>**로 구성하였다.



**CORS 문제도 발생**

* 임시방편으로 `http-proxy-middleware` 모듈을 사용하여 해결하였다.
* 모듈 설치 후 [`/src/setupProxy.js`](./src/setupProxy.js) 파일 생성 후 코드 작성
* 개발 서버 재실행



**`React` 컴포넌트 내에서 수정시(state, props) 재렌더를 할텐데, 
만약 어떠한 함수가 선언 되어 있다면 이 함수는 컴포넌트가 렌더링 될때마다 
새로운 함수를 생성한다** 라는 등의 단점들을 `최적화`를 통해 예방  

* `함수 예`로 **useCallback**은 **지정한 배열 값 변화**에만 **재렌더**를 하고, 나머진 재렌더 하지 않으니 최적화
  * **지정값이 빈배열**일시 기존 **함수** 그대로 사용한다는 뜻. 새로 **함수** 생성될일이 없다.
* `변수 예`로 **useMemo**는 **지정한 배열 값 변화**에만 **재렌더**를 하고, 나머진 재렌더 하지 않으니 최적화
  * **지정값이 빈배열**일시 기존 **변수** 그대로 사용한다는 뜻. 새로 **변수** 생성될일이 없다.
* `props 예`로 **memo**는 **지정한 props(매개변수)의 변화에만 재렌더**를 하고, 나머진 재렌더 하지 않으니 최적화
* **useState**는  **컴포넌트 상태**를 관리. **재렌더시** 변수 새로 다시 선언이 아니라 관리중인 상태값으로 사용. 또한 해당 **상태(state)** 변경시 Virtual Dom에서 재렌더 여부 결정
* **useEffect**는 진짜 LifeCycle의 재렌더(Update)와 유사. **지정한 배열 값의 변화에 실행을함.**



**`LifeCycle`은 Mount, Update, UnMount 로 크게 3가지로 분류**

* 참고로 Ctrl+S 이나, 웹 새로고침은 아마 첨부터 코드 실행하는것 같다. mount과정을 계속 거치길래 그렇게 판단 하였음.(useEffect로 확인해봄)
* 맨 처음 컴포넌트가 **render** 될때는 **마운트** 과정을 거침
  그러나 그 이후에 props, state가 변경되어 **render** 될 때는 마운트를 거치지 않음
  그래서 **마운트(Mount)는 DOM 객체가 생성되고 브라우저에 나타나는 것을 의미**



**Destructuring와 Spread는 블로그 포스팅 보고 잘 기억.**

<br>

## 폴더 구조

- [`/src/App.js`](./src/App.js)

  - 프로젝트의 루트 컴포넌트
- [`/src/containers/MovieContainer.jsx`](./src/containers/MovieContainer.jsx)

  - `mount` 시에 외부 `API`를 호출하며, 응답 받을 때까지 로딩 상태 출력
  - 응답 받은 데이터를 상태로 관리하여 [`Movies`](./src/components/Movie.jsx) 컴포넌트 렌더링
  - 데이터 추가 요청, 변경, 삭제 역할을 수행하는 함수를 작성
  - 전체 선택할 수 있는 [`Checkbox`](./src/components/Checkbox.jsx) 컴포넌트 렌더링
- [`/src/infos/MovieSetCallback.jsx`](./src/infos/MovieSetCallback.jsx)
  - [`MovieContainer`](./src/containers/MovieContainer.jsx) 컨테이너 컴포넌트에서, 상태를 관리하는 `setMovieList` 함수에 값이 아닌 콜백 함수를 매개변수로 넘기는 버전
  - 콜백 함수로 `setState`를 사용하는 방법과 효율성 참고
- [`src/containers/MovieContainer.style.js`](./src/containers/MovieContainer.style.js)
- [`MovieContainer`](./src/containers/MovieContainer.jsx)의 전체 선택 영역 스타일 컴포넌트를 선언
- [`/src/components/Movie.jsx`](./src/components/Movie.jsx)
  - 외부 `API`를 통해 응답 받은 데이터를 렌더링하는 컴포넌트를 선언
  - 렌더링 하는 컴포넌트의 리스트를 `props`로 받아 반복하여 렌더링하는 컴포넌트 선언
  - 해당 컴포넌트의 불필요한 재렌더를 방지하기 위해 `memo` 함수를 적용한 컴포넌트 선언
  - 상위에서 `checked`와 `checked`를 변경할 `onChange` 함수를 받아와 이를 표현하고 이벤트 리스너 등록하는 [`Checkbox`](./src/components/Checkbox.jsx) 컴포넌트를 렌더
  - `Movie` 데이터의 `title` 프로퍼티의 값 내부에 `<b></b>` 태그가 삽입되어 있는데, 그냥 렌더링하면 태그의 이름이 그대로 출력되므로, `HTML` 요소로 표현하기 위해 `dangerouslySetInnerHTML` `props`로 전달
- [`/src/components/Movie.style.js`](./src/components/Movie.style.js)

  - [`Movie`](./src/components/Movie.jsx)와 리스트를 감싸는 스타일을 지정하는 컴포넌트와, 그 내부에 [`Checkbox`](./src/components/Checkbox.jsx) 컴포넌트의 위치를 잡는 스타일 컴포넌트 선언
- [`/src/components/Checkbox.jsx`](./src/components/Checkbox.jsx)

  - 체크박스 역할을 하는 컴포넌트 선언
- [`/src/components/Checkbox.style.js`](./src/components/Checkbox.style.js)
- 체크박스의 스타일을 지정하기 위해 `@mui/material`의 `Checkbox`에 스타일을 적용한 컴포넌트 선언
- [`/src/components/AppendButton.jsx`](./src/components/AppendButton.jsx)
- 영화 목록 추가 요청하는 함수를 실행할 버튼 컴포넌트 선언
- [`/src/components/AppendButton.style.js`](./src/components/AppendButton.style.js)

  - 버튼의 스타일을 지정하기 위해 `@mui/material`의 `ButtonBase`에 스타일을 적용한 컴포넌트 선언
- [`/src/components/DeleteButton.jsx`](./src/components/DeleteButton.jsx)

  - checked 상태인 영화 목록 삭제하는 함수를 실행할 버튼 컴포넌트 선언
- [`/src/components/DeleteButton.style.js`](./src/components/DeleteButton.style.js)

  - 버튼의 스타일을 지정하기 위해 `@mui/material`의 `ButtonBase`에 스타일을 적용한 컴포넌트 선언
- [`/src/apis/fetch.js`](./src/apis/fetch.js)
  - `fetch API`를 통해 외부 `API`에 데이터 요청하는 함수
  - `async await`를 사용해 콜백 함수 형태를 제거함
  - `process.env.REACT_APP_이름`으로 환경 변수 사용
  - `qs` 모듈을 사용해 `URL`에 쿼리 첨부하여 요청
- [`/src/infos/MovieSetCallback.jsx`](./src/infos/MovieSetCallback.jsx)

  - [`MovieContainer`](./src/containers/MovieContainer.jsx) 컴포넌트 컨테이너의 `setMovieList`에 값을 매개변수로 넣는 방식이 아닌 콜백 함수를 매개변수로 넣는 방식을 채택한 코드
  - 용이성을 표현

