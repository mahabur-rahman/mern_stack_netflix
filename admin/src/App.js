import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>

      {user && (
        <>
          <Topbar />

          <div className="container">
            <Sidebar />

            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/movies">
                <ProductList />
              </Route>
              <Route path="/movie/:productId">
                <Product />
              </Route>
              <Route path="/new-movie">
                <NewProduct />
              </Route>
            </Switch>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
