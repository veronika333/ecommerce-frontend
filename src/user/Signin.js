import React, {useState} from 'react';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth/index';
import { Redirect } from 'react-router-dom';

 const Signin = () => {
     //useState hook to update state when input gets values/changes
     const [values, setValues] = useState({
         //useState is going to be an object 
         email: '',
         password: '',
         error: '',    //to show error
         loading: false,   //default value for loading is false
         redirectedUser: false 
     })

     const {email, password, loading, error, redirectedUser} = values;
const {user} = isAuthenticated() //destructuring
     //function returning another function, grab the eventTypeName and then grab  event (higher order function)
     const handleChange = eventTypeName => event => {
setValues({...values, error: false, [eventTypeName]:event.target.value})
     }

     const handleSubmit = (e) => {
e.preventDefault(); //prevent reloading
setValues({...values, error: false, loading: true}); //set previous errors to false
signin({email, password}) //give email and password to sign in
.then(data => {
    if(data.error) {
        setValues({
            ...values, error: data.error, loading:false
        })
    } else { //if there was no error, authenticate(keep in localStorage) and redirect the user
        authenticate(data, () => {
          setValues({
                ...values, 
                redirectedUser: true
            });   
        });   
        }
});
     };

const signInForm = () => (
    <form>

        <div className="form-group">
<label className="text-muted">Email</label>
<input type="email" name="email" className="form-control" onChange={handleChange('email')} value={email}></input>
        </div>

        <div className="form-group">
<label className="text-muted">Password</label>
<input type="password" name="password" className="form-control" onChange={handleChange('password')} value={password}></input>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>
);

const showError = () => (
<div className="alert alert-danger" style={{display: error ? "" : 'none'}}>{error}</div>
)

const showLoading = () => 
   loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)  //if loading is true, then show the div

const redirectTheUser =() => {
    if(redirectedUser){ //check if the user is admin
        if(user && user.role === 1){
             return <Redirect to="/admin/dashboard" />;
        } else {
            return <Redirect to="/user/dashboard" />
        }
       
    }
    if(isAuthenticated()){
        return <Redirect to="/" />
    }
}


 return (
     <Layout title="Sign In" description="Sign In to E-commerce website with Node and React"
     className="container col-md-8 offset-md-2">
 {showLoading()}
 {showError()}        
{signInForm()}
{redirectTheUser()}
     </Layout>
 )
 }
export default Signin