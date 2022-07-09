// 사용 X

import { useState, useCallback, useEffect, useMemo } from "react";
import { requestGetMovieList } from "../apis/fetch";
import AppendButton from "../components/AppendButton";
import DeleteButton from "../components/DeleteButton";
import { Movies } from "../components/Movie";
import Checkbox from "../components/Checkbox"
import {StyleMovieAllCheckArea,StyleMovieAllCheckText} from "./MovieContainer.style"

// 최적화
// movieList가 변할때만 함수 새로 생성하기 위해 useCallback() 사용
// 재렌더마다 API 요청이 아닌 mount 시에만 API 요청하기 위해 useEffect() 사용
// data.items => [{},{},...] 로 구성

const MovieContainer = () => {
    const [movieList, setMovieList] = useState([]);
    
    const AllChecked = useMemo(() => {
        return movieList.every((movieItem) => movieItem.checked);
    }, [movieList]); // movieList의 모든 요소가 갖고 있는 checked가 true인지 판단하는 useMemo
      // every 함수를 통해 모든 요소의 checked가 true이면 true를 AllChecked에 할당

    const allNoneChecked = useMemo(() => {
        return movieList.every((movieItem) => !movieItem.checked);
    }, [movieList])

    const callApiGetMovieList = useCallback(async () => {
        const data = await requestGetMovieList(movieList.length + 1);
        const newItems = data.items.map((item) => {
            return {...item,
            checked: false,}
        });
        const newMovieList = movieList.concat(...newItems);
        setMovieList(newMovieList)
        console.log(data.items)
    }, [movieList])

    const handleChangeCheck = useCallback((link) => {
            // link의 값을 가진 요소의 checked를 반대로 바꾸는 함수
            // link를 유일한 값이라고 생각하고 사용
            const newMovieList = movieList.map((movieItem)=> 
                link === movieItem.link
                    ? { ...movieItem, checked: !movieItem.checked }
                    : movieItem
            )// movieItem의 link가 매개변수로 넘어온 link와 같다면 그 요소의 checked를 반대로 바꾸는 로직
            setMovieList(newMovieList)
        },
        [movieList]
    );

    const onChangeAllCheck = useCallback(() => {
        // movieList의 모든 요소의 checked를 AllChecked 상태의 반대로 바꾸는 함수
        const newMovieList = movieList.map((movieItem) => ({
          ...movieItem,
          checked: !AllChecked,
        })); // movieList의 모든 요소의 checked를 AllChecked 상태의 반대로 바꾸는 로직
        setMovieList(newMovieList);
    }, [AllChecked, movieList]);

    const onDeleteChecked = useCallback(() => {
        const newMovieList = movieList.filter((movieItem) => !movieItem.checked);
        setMovieList(newMovieList)
    },[movieList])

    useEffect(() => {
        // mount 시에만 API 요청
        callApiGetMovieList();
    }, [])

    return (
        <div>
            <StyleMovieAllCheckArea>
                <StyleMovieAllCheckText checked={AllChecked}>
                전체 선택
                </StyleMovieAllCheckText>
                <Checkbox checked={AllChecked} onChange={onChangeAllCheck}/>
                <DeleteButton disabled={allNoneChecked} onClick={onDeleteChecked} />
            </StyleMovieAllCheckArea>
            <Movies movieList={movieList} onChangeCheck = {handleChangeCheck}/>
            <AppendButton onClick={callApiGetMovieList}/>
        </div>
    );
}

export default MovieContainer;