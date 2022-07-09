import { Backdrop, CircularProgress } from "@mui/material";
// 로딩 컴포넌트에서 사용할 Material UI 컴포넌트 가져옴

const Loading = ({ isLoading }) => {
  // isLoaing props의 값이 true면 로딩 상태 렌더
  // false면 로딩 상태 렌더하지 않음
  return (
    <Backdrop open={isLoading}>
      <CircularProgress />
    </Backdrop>
  );
};

export default Loading;