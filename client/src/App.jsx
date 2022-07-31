import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


const App = () => {

  // const user = false // test용
  const user = useSelector(state => state.user.currentUser)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/products/:category" element={<ProductList />}/>
        <Route path="/product/:id" element={<Product />}/>
        <Route path="/cart" element={<Cart />}/>
        {/* 로그인 성공여부에 따른 페이지 전환 */}
        <Route path="/login" element={(
          user ? (<Navigate replace to="/"/>) : (<Login/>)
        )}/>
        <Route path="/register" element={(
          user ? (<Navigate replace to="/"/>) : (<Register/>)
        )}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;