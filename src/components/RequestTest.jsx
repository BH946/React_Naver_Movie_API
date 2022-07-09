// API 요청 테스트 용으로만 사용

import { useCallback, useEffect, useState } from "react";

const URL = "/api/v1/search/movie.json?query=어벤져스";
// API를 요청할 주소
// 참고로 cors 문제는 임시로 해결

// API 요청 테스트하는 컴포넌트
const RequestTest = () => {
  // fetch API 요청 test(async/await으로 비동기 요청을 동기처럼 사용)
  const callApiFetch = async () => {
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
      },

    })
    console.log(response)
    const data = await response.json();
    console.log(data.items)
  }
  useEffect(() => {
    // mount 시 API 요청
    callApiFetch();
    console.log("rendering~")
  }, []);

  return (<></>);
}

export default RequestTest;
