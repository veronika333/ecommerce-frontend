import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

const PrivateRoute = ({ component: Component, ...rest }) =>  //from documentation reactrouter.com, web, redirects
   ( 
        <Route {...rest} render={props => isAuthenticated() ? (
<Component {...props} /> //if user isAuthenticated return component, props
        ) : ( //otherwise redirect the user
<Redirect to={{pathname: '/signin', state: {from: props.location}}} />
        )} />
                
     );

 
export default PrivateRoute;