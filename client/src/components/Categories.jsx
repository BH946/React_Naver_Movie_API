import styled from "@emotion/styled"
import { categories } from "../data";
import CategoriyItem from "./CategoriyItem";
import {mobile} from "../responsive"

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({padding : "0px", flexDirection:"column"})}
`;

const Categories = () => {
  return (
    <Container>
        {categories.map(item => {
            return (
                <CategoriyItem item={item} key={item.id}/>
            )
        })}
    </Container>
  )
};

export default Categories