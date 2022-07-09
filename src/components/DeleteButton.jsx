import { StyleDeleteButton } from "./DeleteButton.style";

const DeleteButton = ({ onClick, disabled }) => {
  // 삭제 함수를 클릭 이벤트로 사용하기 위해 onClick props 받아옴
  // 또한, checked 상태인 영화 목록이 없으면 비활성화하기 위해 disabled props 받아옴
  return (
    <StyleDeleteButton onClick={onClick} disabled={disabled}>
      삭제
    </StyleDeleteButton>
  );
}; // checked 상태인 영화 목록을 삭제하기 위해 만든 버튼 컴포넌트

export default DeleteButton;
