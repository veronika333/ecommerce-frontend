import React, {useState} from 'react';
import Layout from '../core/Layout';
import { signup } from '../auth/index';
import { Link } from 'react-router-dom';

 const Signup = () => {
     //useState hook to update state when input gets values/changes
     const [values, setValues] = useState({
         //useState is going to be an object 
         name: '',
         email: '',
         password: '',
         error: '',    //to show error
         success: false   //default value for success is false
     })

     const {name, email, password, success, error} = values;

     //function returning another function, grab the eventTypeName and then grab  event (higher order function)
     const handleChange = eventTypeName => event => {
setValues({...values, error: false, [eventTypeName]:event.target.value})
     }

     const handleSubmit = (e) => {
e.preventDefault(); //prevent reloading
setValues({...values, error: false}); //set previous errors to false
signup({name, email, password}) //give name, email and password to sign up
.then(data => {
    if(data.error) {
        setValues({
            ...values, error: data.error, success:false
        })
    } else { //if there was no error, clear all the old input data (update)
            setValues({
                ...values, 
                name:'',
                email:'',
                password:'',
                error:'',
                success:true
            })
        }
    
})
     }

const signUpForm = () => (
    <form>
        <div className="form-group">
<label className="text-muted">Name</label>
<input type="text" className="form-control" onChange={handleChange('name')} value={name}></input>
        </div>

        <div className="form-group">
<label className="text-muted">Email</label>
<input type="email" className="form-control" onChange={handleChange('email')} value={email}></input>
        </div>

        <div className="form-group">
<label className="text-muted">Password</label>
<input type="password" className="form-control" onChange={handleChange('password')} value={password}></input>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>
);

const showError = () => (
<div className="alert alert-danger" style={{display: error ? "" : 'none'}}>{error}</div>
)

const showSuccess = () => (
    <div className="alert alert-info" style={{display: success ? "" : 'none'}}>
        You have successfully created an account. Please <Link to="/signin">sign in</Link>.
    </div>
)

 return (
     <Layout title="Sign Up" description="Sign Up to E-commerce website with Node and React"
     className="container col-md-8 offset-md-2">
 {showSuccess()}
 {showError()}        
{signUpForm()}
{/* {JSON.stringify(values)}  */}
     </Layout>
 )
 }
export default Signup