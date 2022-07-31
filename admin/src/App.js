import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar"
import Home from "./pages/home/Home";
import "./app.css"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";

function App() {
  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;
  // 현재는 localStorage가 있는 경우만 정상 동작. 나중에 state로 바꿀것
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}/>
          </Routes>
          
          { admin && (
          <>
            <Topbar/>
            <div className="container">
              <Sidebar/>          
              <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/users" element={<UserList/>}/>
                <Route path="/user/:userId" element={<User/>}/>
                <Route path="/newUser" element={<NewUser/>}/>

                <Route path="/products" element={<ProductList/>}/>
                <Route path="/product/:productsId" element={<Product/>}/>
                <Route path="/newProduct" element={<NewProduct/>}/>
              </Routes>
            </div>
          </>
          )}
    </BrowserRouter>
  );
}

export default App;
