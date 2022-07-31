import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined'
import Badge from '@mui/material/Badge/Badge'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {mobile} from '../responsive'
import { logout } from "../redux/userRedux"

// width:33.33333333333% 이런식으로 아무리 나눠도 100%나뉘는게 아니기 때문에
// flex 같은걸 사용
const Container = styled.div`
  height: 60px;
  ${mobile({height: "50px"})}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex; // 기본적으로 세로로 ui가 나타나니까 flex를 통해 가로로(horizontal)
  justify-content: space-between; // 사이 공백으로 정확히 나눔
  ${mobile({padding: "10px 0px"})} // 가로를 0px로
`;

const Left = styled.div`
  display: flex;
  flex:1;
  align-items: center;
`;

const Language = styled.div`
  font-size: 14px;
  cursor: pointer; // cursor를 pointer 표시(커서 모양 변경)
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: 0px; // none
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex:1;
  text-align: center; // text-> center
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`

const Right = styled.div`
  flex:1;
  display:flex;
  align-items: center;
  justify-content: flex-end; // end쪽으로 가서 정렬함
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  const dispatch = useDispatch();

  const test = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input  placeholder="Search"/>
            <SearchIcon style={{color:"gray", fontSize:16}}/>
          </SearchContainer>
        </Left>
        <Center><Logo>LAMA</Logo></Center>
        <Right>
          <MenuItem onClick={test}>REGISTER</MenuItem>
          <Link to="/login">
          <MenuItem>SIGN IN</MenuItem>
          </Link>
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined/>
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar;
