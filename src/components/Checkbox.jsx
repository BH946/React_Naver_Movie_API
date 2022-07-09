import { StyleCheckbox } from "./Checkbox.style";

const Checkbox = (props) => {
  // 실제 input과 동일한 props를 그대로 전달하기 위해 모든 props를 객체로 통합하여 하위로 전달
  // { checked, onChange }로 받는 방법이 풀어서 쓰면
  // const { checked, onChange } = props; 와 동일함
    return <StyleCheckbox {...props} />;
}

export default Checkbox;