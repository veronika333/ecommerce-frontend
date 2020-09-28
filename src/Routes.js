import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import UserDashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}></Route>
                <Route path='/signin' exact component={Signin}></Route>
                <Route path='/signup' exact component={Signup}></Route>
                <PrivateRoute path='/user/dashboard' exact component={UserDashboard}></PrivateRoute>
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}></AdminRoute>
                <AdminRoute path="/create/category" exact component={AddCategory}></AdminRoute>
            </Switch>
        </BrowserRouter>
    )
}
