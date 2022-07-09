import styled from "@emotion/styled";

export const StyleMovieItem = styled.div`
    position: relative;

    // display는 화면을 배치하는 방법
    display: flex; // flex란 유연성을 뜻함
    flex-direction: row; // align(가로)와 justify(세로) 반대로 생각할 것
    align-items: center;
    
    width:100%;
    border: solid 1px #777; // 실선, 1px크기, #777색깔
    border-radius: 20px; // 둥글게
    // border-radius에 의해 끝쪽이 줄었지만 내부 요소는 오버할 수 있음
    overflow: hidden; // 오버한 부분 hidden으로 숨김
    box-shadow: 0px 3px 15px #0003; // 이 그림자 속성값을 추천

    // scss문법이며, 두번째 요소부터 margin-top이 먹히는 특징
    & + & {
        margin-top: 20px;
    }
`;

export const StyleMovieImageBox = styled.div`
    display: flex;
    width:40%;
    height: 100%;
`;

export const StyleMovieImage = styled.img`
    // display: block; 으로 해도됨
    // block은 어떤 특정 구역을 차지해버림(빈부분없이 채움)
    width:100%;
`;

export const StyleMovieContentBox = styled.div`
    width: 60%; // 그림영역 40% 였었음
    padding: 12px;
`;

export const StyleMovieAnchor = styled.a`
    color:#222;
    font-size: 12px;
    text-align: center; // text 정렬
    word-break: keep-all; // 텍스트들 줄 바꿈 속성(단어)
    // break-all : 문자 단위로 줄바꿈
    // keep-all : 단어 단위로 줄바꿈

    text-decoration: none; // 밑줄 X
    &:hover { // 마우스 hover때(&는 this로 생각할것)
        text-decoration: underline; // 밑줄 O
    }
`;

export const StyleMovieTitle = styled.h3`
    color: #000;
`;

export const StyleMovieSubtitle = styled.h4`
    color : #555;
    margin-top: 8px;
`;

export const StyleMovieDirector = styled.p`
    color: #999;
    margin-top: 40px;
`;

export const StyleMovieList = styled.div`
    padding: 0 80px; // 좌우 padding
`;

export const StyleMovieCheckboxArea = styled.div`
    position: absolute;

    top: 6px;
    right: 6px;
`;