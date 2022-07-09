import styled from "@emotion/styled/macro";

export const StyleMovieAllCheckArea = styled.div`
  display: flex;
  align-items: center; // 현재 flex의 배치 방향(가로)에 수직(세로) 배치를 중앙 정렬 => 수직 중앙 정렬
  justify-content: flex-end; // 뒤쪽에서부터 요소를 위치시킴
`; // 전체 선택이 위치한 영역의 스타일 컴포넌트

export const StyleMovieAllCheckText = styled.p`
  font-size: 14px;
  color: ${(props) => (props.checked ? "#222" : "#999")};
  // 텍스트의 props인 checked가 true이면 진한 검정, flase이면 연한 회색을 띔
`; // 전체 선택 텍스트 스타일 컴포넌트
