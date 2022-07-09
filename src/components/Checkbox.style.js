import styled from "@emotion/styled";
import { Checkbox } from "@mui/material";
// Material UI에 스타일을 적용하기 위해 가져옴

export const StyleCheckbox = styled(Checkbox)`
  // styled 객체에 .HTML태그명 이 아닌 괄호로 컴포넌트를 넣어주면 해당 컴포넌트에 스타일 지정
  width: 48px;
  height: 48px;
`; // Material UI의 Checkbox에서, 크기를 48px로 변경한 스타일 컴포넌트(체크박스)
