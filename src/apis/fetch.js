import qs from "qs";

const URL = "/api/v1/search/movie.json";
// https://openapi.naver.com/v1/search/movie.json
// API를 요청할 주소
// 참고로 cors 문제는 임시로 해결

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

