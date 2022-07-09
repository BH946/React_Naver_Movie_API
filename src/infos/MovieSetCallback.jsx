import { useState, useCallback, useEffect, useMemo } from "react";

import Loading from "../components/Loading";
import { Movies } from "../components/Movie";
import AppendButton from "../components/AppendButton";
import DeleteButton from "../components/DeleteButton";
import Checkbox from "../components/Checkbox";
// 컴포넌트 가져옴

import { requestGetMovieList } from "../apis/fetch";
// api 요청 함수 가져옴

import {
  StyleMovieAllCheckArea,
  StyleMovieAllCheckText,
} from "../containers/MovieContainer.style";

// 최적화
// movieList가 변할때만 함수 새로 생성하기 위해 useCallback() 사용
// 재렌더마다 API 요청이 아닌 mount 시에만 API 요청하기 위해 useEffect() 사용
// data.items => [{},{},...] 로 구성

/**
 * 영화의 목록을 관리하는 컨테이너 컴포넌트
 * setState에서 값이 아닌 콜백 함수를 매개변수로 넘기는 컴포넌트
 */
const MovieContainer = () => {
  const [loading, setLoading] = useState(false);
  // 로딩 상태 state로 정의
  const [movieList, setMovieList] = useState([]);
  // 요청한 영화 리스트 state로 정의

  const AllChecked = useMemo(() => {
    return movieList.every((movieItem) => movieItem.checked);
  }, [movieList]);

  const allNoneChecked = useMemo(() => {
    return movieList.every((movieItem) => !movieItem.checked);
  }, [movieList]);

  const callApiGetMovieList = useCallback(async () => {
    // 영화 목록을 가져오는 API를 요청하는 함수
    setLoading(true);
    try { // 무한로딩 방지(try,catch)
      const data = await requestGetMovieList(movieList.length + 1);
      // 이 함수는 콜백 함수를 전달하는 setMovieList를 사용하여도
      // 여기에서 movieList를 사용하기 때문에 deps 배열에 movieList를 넣어주어야 함
      const newItems = data.items.map((item) => ({
        ...item,
        checked: false,
      }));
      console.log(data.items)
      setMovieList((prevMovieList) => {
        const newMovieList = prevMovieList.concat(...newItems);
        return newMovieList;
        // 기존 movieList.concat 코드는 이 컴포넌트의 상태에 의존하는 것
        // prevMovieList를 사용하면 React의 상태에 의존하게 됨
        // 따라서 movieList를 사용할 필요가 없어짐
      });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [movieList]);

  const handleChangeCheck = useCallback((link) => {
    setMovieList((prevMovieList) => {
      const newMovieList = prevMovieList.map((movieItem) =>
        link === movieItem.link
          ? { ...movieItem, checked: !movieItem.checked }
          : movieItem
      ); // prevMovieList를 참조하게 되어 더 이상 이 컴포넌트의 movieList에 의존하지 않기 때문에
      // movieList의 값을 감지해야할 필요 또한 사라짐
      return newMovieList;
    });
  }, []); // 이 함수는 mount 이후 단 한 번만 생성됨

  const onChangeAllCheck = useCallback(() => {
    // movieList의 모든 요소의 checked를 AllChecked 상태의 반대로 바꾸는 함수

    setMovieList((prevMovieList) => {
      const newMovieList = prevMovieList.map((movieItem) => ({
        ...movieItem,
        checked: !AllChecked,
      })); // prevMovieList를 참조하게 되어 더 이상 이 컴포넌트의 movieList에 의존하지 않기 때문에
      // movieList의 값을 감지해야할 필요 또한 사라짐
      // 하지만 여전히 AllChecked의 값은 감지해야 함
      return newMovieList;
    });
  }, [AllChecked]); // 이 함수는 movieList의 변경에는 생성되지 않으며, mount 시와 AllChecked가 변경되었을 때만 생성됨

  const onDeleteChecked = useCallback(() => {
    setMovieList((prevMovieList) => {
      const newMovieList = prevMovieList.filter(
        (movieItem) => !movieItem.checked
      );
      return newMovieList;
    });
  }, []); // 이 함수는 mount 이후 단 한 번만 생성됨

  useEffect(() => {
    // mount 시에만 API 요청
    callApiGetMovieList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <StyleMovieAllCheckArea>
        <StyleMovieAllCheckText checked={AllChecked}>
          전체 선택
        </StyleMovieAllCheckText>
        <Checkbox checked={AllChecked} onChange={onChangeAllCheck} />
        <DeleteButton disabled={allNoneChecked} onClick={onDeleteChecked} />
      </StyleMovieAllCheckArea>
      <Movies movieList={movieList} onChangeCheck={handleChangeCheck} />
      <Loading isLoading={loading} />
      <AppendButton onClick={callApiGetMovieList} />
    </div>
  );
};

export default MovieContainer;
