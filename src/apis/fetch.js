import qs from "qs";
import axios from 'axios';

// // Naver API
const URL = "https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/movie.json"
// // https://cors-anywhere.herokuapp.com
// // https://openapi.naver.com/v1/search/movie.json
// // API를 요청할 주소
// // 참고로 cors 문제는 임시로 해결

// offset : 데이터 시작 위치, limit : 데이터 개수 제한
export const requestGetMovieList = async (offset =1, limit = 5) => {
  const query = qs.stringify({
    query: "어벤져스",
    start: offset,
    display: limit,
  })
  const URI = `${URL}?${query}`;

  const response = await fetch(URI, {
    headers: {
      "Content-Type": "application/json",
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });

  return await response.json();
};


// axios경우
// "proxy": "https://openapi.naver.com/v1/" // 패키지로
// const URL = "search/movie.json";
// export const requestGetMovieList = async (offset =1, limit =5) => {
//   const response = await axios({
//     method: "get",
//     url: URL,
//     params: {
//       query: "어벤져스",
//       start: offset,
//       display: limit,
//     },
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//       "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
//       "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
//     },
//   });
//   console.log(response.data);
//   return response.data;
// }


// TMDB API
// const URL = "https://api.themoviedb.org/3/search/movie";
// // const URL = "/api/search/movie";
// export const requestGetMovieList = async (offset = 1, limit = 5) => {
//   const query = qs.stringify({
//     query: "어벤져스",
//     api_key: process.env.REACT_APP_TMDB_KEY
//   })
//   const URI = `${URL}?api_key=${process.env.REACT_APP_TMDB_KEY}&query=어벤져스`
//   const response = await fetch(URI)
//   const json = await response.json();
//   console.log(json);
//   return json;
// }

