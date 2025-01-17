import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import UserDashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}></Route>
                <Route path='/shop' exact component={Shop}></Route>
                <Route path='/signin' exact component={Signin}></Route>
                <Route path='/signup' exact component={Signup}></Route>
                <PrivateRoute path='/user/dashboard' exact component={UserDashboard}></PrivateRoute>
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}></AdminRoute>
                <AdminRoute path="/create/category" exact component={AddCategory}></AdminRoute>
                <AdminRoute path="/create/product" exact component={AddProduct}></AdminRoute>
                <Route path="/product/:productId" exact component={Product}></Route>
                <Route path="/cart" exact component={Cart}></Route>
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <PrivateRoute path='/admin/products' exact component={ManageProducts}></PrivateRoute>
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}></AdminRoute>
            </Switch>
        </BrowserRouter>
    )

}
