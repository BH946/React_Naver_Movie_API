import styled from "@emotion/styled"
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { useState } from "react";
import { sliderItems } from "../data";
import {mobile} from "../responsive"

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden; // 옆으로 더 많아진 데이터들 hidden
    ${mobile({ display: "none" })}
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%; // 반지름 50 => 원형
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute; // 반드시 부모 relative해야함. (위치변동 위함. 절대적 구조를 의미)
    // 따라서 화살표가 겹쳐 보이는것(절대적 구조로 바꿔서). 나누는건 아래 코드 확인
    top: 0;
    bottom: 0;
    margin: auto; // 위 아래 0이므로 마진 auto시 알아서 세로 중앙으로 정렬
    left: ${props=>{return props.direction === "left" ? "10px" : null}};
    right: ${props=>{return props.direction === "right" ? "10px" : null}};
    cursor:pointer;
    opacity: 0.5; // 투명도
    z-index: 2; // 우선순번
`

const Wrapper = styled.div`
    display: flex; // 세로가 아닌 가로로 보기 위해
    height: 100%;
    transition: all 1.5s ease; // animation 기능
    transform: translateX(${props=> props.slideIndex * -100}vw);
`

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display:flex;
    align-items: center;
    background-color: #${props=>props.bg};
`

const ImgContainer = styled.div`
    height: 100%;
    flex:1;
`

const Image = styled.img`
    height: 80%;
`

const InfoContainer = styled.div`
    flex:1;
    padding: 50px;
`

const Title = styled.h1`
    font-size: 70px;
`
const Desc = styled.p`
    margin: 50px 0px; // 세로
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px; // 문자 간격
`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction) => {
        if(direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2)
        } else { // right
            setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0)
        }
    }

  return (
    <Container>
        <Arrow direction="left" onClick={()=>handleClick("left")}>
            <ArrowLeftOutlinedIcon/>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {sliderItems.map(item => { // data.js 활용
                return (
                    <Slide bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <Image src={item.img}/>
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button>SHOW NOW</Button>
                        </InfoContainer>
                    </Slide>
                )
            })}
        </Wrapper>
        <Arrow direction="right" onClick={()=>handleClick("right")}>
            <ArrowRightOutlinedIcon/>
        </Arrow>
    </Container>
  )
}

export default Slider