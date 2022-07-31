import styled from "@emotion/styled"
import { useEffect, useState } from "react";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap; // 화면에 맞춰 분리까지
`;

const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // axios를 사용해 api 데이터 가져올것이며, useEffect내에 작성할것이다.
  useEffect(()=>{
    const getProducts = async () => {
      try{
        // Home같은 경우는 category없이 전체 데이터 보여주므로 삼항연산 사용
        const res = await axios.get(
          cat 
            ? `/proxy/api/products?category=${cat}`
            : "/proxy/api/products"
        );
        setProducts(res.data) // products 변경됬으니 아래 useEffect 실행하겠죠
        console.log(res.data)
      }catch(err){

      }
    };
    getProducts();
  },[cat]) // 카테고리 누를때마다 변경 및 첫 마운트때

  // 카테고리에서 구한 products를 필터작업 거치고 filteredProducts에 넣어주기
  // Object는 전역객체. 여기에 res데이터 있으며, filters는 url에 카테고리 명이다.
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item)=>
          Object.entries(filters).every(([key, value])=>
            item[key].includes(value)
          )
        )
      );
  },[products, cat, filters]);

  // sort 작업도 추가~!
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
        {/* {popularProducts.map(item => { */}
        {cat // category있으면 Home 페이지 아님
          ? filteredProducts.map(item => <Product item={item} key={item.id}/>)
          : products
              .slice(0, 8) // 전체 제품 8개만
              .map((item)=> <Product item={item} key={item.id}/>)
        }
    </Container>
  )
}

export default Products