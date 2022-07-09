import {memo} from "react";
import { StyleMovieItem, StyleMovieImageBox, StyleMovieImage,
    StyleMovieContentBox, StyleMovieAnchor, StyleMovieTitle, 
    StyleMovieSubtitle, StyleMovieDirector, StyleMovieList, StyleMovieCheckboxArea 
} from "./Movie.style";
import Checkbox from "./Checkbox";

// 최적화
// 지정한 props의 변화 외의 불필요한 컴포넌트 재렌더 방지하는 memo() 사용

const Movie = ({ title, subtitle, image, link, director, checked, onChange}) => {
    return (
        <StyleMovieItem>
            <StyleMovieImageBox>
                <StyleMovieImage src={image} alt="movie-thumbnail"></StyleMovieImage>
            </StyleMovieImageBox>
            <StyleMovieContentBox>
                <StyleMovieAnchor href={link}>
                    <StyleMovieTitle dangerouslySetInnerHTML={{ __html: title}}></StyleMovieTitle>
                    <StyleMovieSubtitle>{subtitle}</StyleMovieSubtitle>
                    <StyleMovieDirector>감독 : {director}</StyleMovieDirector>
                </StyleMovieAnchor>
            </StyleMovieContentBox>
            <StyleMovieCheckboxArea>
                <Checkbox checked={checked} onChange={onChange}/>
            </StyleMovieCheckboxArea>
        </StyleMovieItem>
    );
}

const MovieList = ({movieList, onChangeCheck}) => {
    return (
        <StyleMovieList>
            {movieList.map((movieItem) => {
                return(
                    <Movie 
                    key={movieItem.title} // key도 보내줘야 안전
                    {...movieItem}
                    onChange={() => onChangeCheck(movieItem.link)}>
                    </Movie>
                    // onChangeCheck 함수에는 link 매개변수를 넣어주어야 하는데,
                    // 클릭 이벤트로 넣을 때 link 매개변수를 전달하기 위해선 함수를 미리 만들어 놓아야 함
                )
            })}
        </StyleMovieList>
    )
}

export const Movies = memo(MovieList);
// memo 함수를 통해 불필요한 컴포넌트 재렌더 방지
// movieList 이외의 다른 값이 변경되어도 렌더링에 영향을 주지 않음

export default Movie; // 기본값