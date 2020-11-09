import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

const AdminRoute = ({ component: Component, ...rest }) =>  //from documentation reactrouter.com, web, redirects
   ( 
        <Route {...rest} render={props => isAuthenticated() && isAuthenticated().user.role === 1 ? (
<Component {...props} /> //if user isAuthenticated and user is an admin , then return component, props
        ) : ( //otherwise redirect the user
<Redirect to={{pathname: '/signin', state: {from: props.location}}} />
        )} />
                
     );

 
export default AdminRoute;