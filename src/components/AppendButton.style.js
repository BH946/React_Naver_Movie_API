import styled from "@emotion/styled";
import {ButtonBase} from "@mui/material";
// Material UI에 스타일을 적용하기 위해 가져옴

export const StyleAppendButton = styled(ButtonBase)`
  // styled 객체에 .HTML태그명 이 아닌 괄호로 컴포넌트를 넣어주면 해당 컴포넌트에 스타일 지정
  // ButtonBase의 경우, 형태는 없고 클릭 시 Ripple(물결) 효과만 발생할 수 있는 요소를 만듬
  // 거기에 스타일을 지정하여 커스텀 물결 이벤트를 쉽게 만들 수 있는 장점이 있음
    width: 100%;
    height: 40px;

    font-size: 20px;
    color: #fff;
    background-color: #06f;
`;