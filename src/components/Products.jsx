import styled from "@emotion/styled"
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap; // 화면에 맞춰 분리까지
`;

const Products = () => {
  return (
    <Container>
        {popularProducts.map(item => {
            return (
                <Product item={item} key={item.div}/>
            )
        })}
    </Container>
  )
}

export default Products