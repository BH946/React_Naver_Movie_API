import styled from "@emotion/styled/macro";

export const StyleApp = styled.main`
  width: 100%;
  min-height: 100vh; // 화면의 높이를 가져옴
  // 1vh는 화면의 높이 / 100
  background-color: #ebebeb;
`;

export const StyleAppContent = styled.article`
  width: 600px;
  height: 100%;
  margin: 0 auto;
  // 이 요소를 지정하면 상위 요소의 크기 기준으로 세로 축 중앙 정렬
  background-color: #fff;
`;
