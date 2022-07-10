## gh-pages에서 proxy관련(cors)

결론부터 얘기하자면 gh-pages 패키지에서는 proxy가 잘 적용이 안되는것 같다. dev(본인 로컬 개발자 모드)에서는 proxy가 잘 적용이 된다(`http-proxy-middleware`)  
따라서 **다른 이의 프록시 서버를 이용해서 api 요청에 성공**하였다.(서버구동 안하고 클라이언트 부분에서만 해결하려고 해당방법 사용. 서버 구동한다면 반드시 서버쪽에서 `Access-Control-Allow-Origin` 응답 헤더부분을 수정하는것을 강추)

이번 소스에서는 api를 사용하기 위해 요청을 하지만, 클라이언트와 서버가 사용하는 포트가 다를경우 api요청을 자동으로 거절하는 cors 문제가 있었다.

cors 해결을 위해 proxy를 이용해 요청 주소를 api 서버와 맞게 잘 변경해서 사용했는데, dev에선 잘 동작하고 gh-pages 에선 잘 동작하지 않는다.  [관련 내용](https://stackoverflow.com/questions/62183156/create-react-app-gh-pages-deploy-with-proxy)

- **첫번째 의문**은 gh-pages 패키지를 사용해 npm run deploy를 통해 build폴더 생성 시킬때 http-proxy-middleware관련 내용은 build폴더에 소스로 같이 안들어 간다는걸까?
- **두번째 의문**은 gh-page인 깃허브에서 제공하는 깃허브 페이지 기능 자체 즉, 깃허브에서 그냥 proxy를 지원하지 않는다는건지 의문이 들었다.
  * **참고로 클라이언트 관점에서만 수정**하려고 하는중이다.(서버는 애초에 cors 정책이 적용되지 않으므로 서버끼리 api 요청은 전혀 cors 문제가 발생하지 않는다.)

**세번째 의문**은 구글링 하다가 들었다. [관련 내용](https://github.com/jiho3894/Charliving)  이분의 코드를 보면, 똑같이 react에 gh-pages사용하며 api까지 사용하였는데 애초에 cors문제가 발생하지 않았다.  

* 이유가 궁금하여서 똑같은 api를 사용해서 요청해봤는데 정말 cors문제가 발생하지 않았다.
* 그렇다면 세번째 의문은 왜 해당 [TMDB](https://developers.themoviedb.org/3) API는 cors 문제가 없는건지 너무 궁금하다.
  * 나의 생각에는 TMDB API는 네이버 API와 다르게 서버에서 응답헤더에 `Access-Control-Allow-Origin:*` 이런식으로 설정한것은 아닐까 싶다. 정확한건 몰라서 누군가 알려준다면 정말 좋을것 같다. => 어디서 얼핏 SOP 관련 문제를 네이버에서 체크한다고 들었던것 같다.

결국 https://cors-anywhere.herokuapp.com 인 남의 프록시 서버를 통해 우리가 요청할때 이 프록시 서버가 중간에 요청을 가로채서 HTTP 응답 헤더에 `Access-Control-Allow-Origin:* `를 설정해서 응답해준다. 이 덕분에 해결하긴 했는데, `Access-Control-Allow-Origin:*` 방식의 `*`은 모든 도메인 허용을 의미하기 때문에 만약 직접 서버에서 수정하게 된다면 그때는 적절히 허용할 도메인(URL)만 적용할것을 추천한다.

참고로 해당 프록시 서버 사이트는 악용사례도 많고 이래서 관리자가 조금 제약을 걸어뒀다. [관련내용](https://github.com/Rob--W/cors-anywhere/issues/301)  
해당 내용에서 핵심은 https://cors-anywhere.herokuapp.com 들어가면 아마 demo 서버 관련 얘기 있었을것이다. 그걸 허용? 했었을거다. 그러고나면 해당 프록시서버 이용할 수 있으니 이부분은 꼭 체크하고 넘어가길 바란다.(속도도 일부러 느리게 관리자가 바꾸셨다ㅜ)



axios로 하면 혹시나 baseURL이 있으니까 잘 될까 싶었지만 여기도 dev만 되고 있다.

```js
const URL = "search/movie.json";
export const requestGetMovieList = async (offset =1, limit =5) => {
  const response = await axios({
    method: "get",
    url: URL,
    params: {
      query: "어벤져스",
      start: offset,
      display: limit,
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  console.log(response.data);
  return response.data;
```

깃헙으로 넘어가면 아래 코드인 proxy부분이 안먹히는것 같다.

```js
    ]
  },
  "devDependencies": {
    "gh-pages": "^4.0.0",
    "http-proxy-middleware": "^2.0.6"
  },
  "proxy": "https://openapi.naver.com/v1/"
}
```

만약 proxy 여러개 url 정의하고 싶다면? `http-proxy-middleware` 사용 추천. 물론 dev에서만 되고, 깃헙은 X. 

참고로 따로 서버 만들어 배포하는건 당연히 전혀 문제없다. 이경우 크로스브라우징(CROS)문제 해결방안도 더욱 많다.



> 참고해볼 사이트
>
> > [참고 문헌](https://github.com/velopert/react-tutorial/blob/master/redux-middleware/09-cors-and-proxy.md)
>
> > [참고 문헌](https://xiubindev.tistory.com/115)

**gh-pages 실행화면 : [URL](https://bh946.github.io/react-naver-movie-api/)**

<br>

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

<br>

## 참고

`gh-pages`에서 npm run deploy는 수정때마다 입력해서 적용하면 되고, build폴더가 수정되며 gh-pages브랜치에까지 바로 push된다.
