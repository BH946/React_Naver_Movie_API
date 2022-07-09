import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";
// Material UI에 스타일을 적용하기 위해 가져옴

export const StyleDeleteButton = styled(ButtonBase)`
  // styled 객체에 .HTML태그명 이 아닌 괄호로 컴포넌트를 넣어주면 해당 컴포넌트에 스타일 지정
  // ButtonBase의 경우, 형태는 없고 클릭 시 Ripple(물결) 효과만 발생할 수 있는 요소를 만듬
  // 거기에 스타일을 지정하여 커스텀 물결 이벤트를 쉽게 만들 수 있는 장점이 있음
  width: 120px;
  height: 40px;

  font-size: 20px;
  color: #fff;

  background-color: ${(props) => (props.disabled ? "#f007" : "#f00")};
  // Delete Button은 checked된 영화 목록이 없으면 비활성화 되는데, 시각적인 표시를 추가하기 위해서 사용
  // props로 넘기면 @emotion/styled에서 접근 가능함
  // disabled가 true이면 반투명한 빨간색, false이면 진한 빨간색을 띔
`; // checked된 영화 목록을 삭제하는 버튼 스타일 컴포넌트
