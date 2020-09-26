import React from 'react';
import { Link, withRouter } from 'react-router-dom'; // withRouter allows to access props history
import { signout, isAuthenticated } from '../auth/index';

// if the link is active, return different color
const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: "pink"}
    } else {return {color: "white"}}
}

function Menu( { history } ){
    return (
 <div>
           <ul className="nav nav-tabs bg-primary">
<li className="nav-item">
    <Link className="nav-link" to="/" style={isActive(history, '/')}>home</Link>
</li>
{!isAuthenticated() && (
    <>
    <li className="nav-item">
    <Link className="nav-link" to="/signin" style={isActive(history, '/signin')}>sign in</Link>
</li>
<li className="nav-item">
    <Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>sign up</Link>
</li>
    </>
)}
{isAuthenticated() && (
   <li className="nav-item">
    <span className="nav-link" style={{cursor:"pointer", color:"white"}} 
    onClick={() => signout(() =>{
    history.push("/"); //push user to home page
    })}>sign out</span>
</li> 
)}

           </ul> 
        </div>
    )
}
       
    
export default withRouter(Menu);