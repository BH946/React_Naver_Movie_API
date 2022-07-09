import { StyleAppendButton } from "./AppendButton.style";

const AppendButton = ({onClick}) => {
    return(
        // 추가 요청 함수를 클릭 이벤트로 사용하기 위해 onClick props 받아옴
        <StyleAppendButton onClick={onClick}>추가</StyleAppendButton>
    )
}

export default AppendButton;