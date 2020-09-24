import React, {useState} from 'react';
import Layout from '../core/Layout';
import { API } from '../config';

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

     const {name, email, password} = values;

     //function returning another function, grab the eventTypeName and then grab  event (higher order function)
     const handleChange = eventTypeName => event => {
setValues({...values, error: false, [eventTypeName]:event.target.value})
     }

const signup = (user) => { //user(javascript object, then convert to json) comes from signup({name, email, password})
    console.log(user);
fetch(`${API}/signup`, {
method: "POST",
headers: {
    Accept: 'application/json', //api responds with json data, so need to accept it
    "Content-Type": "application/json" 
},
//the actual data in the body, need to send it as a json string
body: JSON.stringify(user)
})
//get either success or error
.then(response => {
    return response.json()
})
.catch(err => {
    console.log(err)
})
}

     const handleSubmit = (e) => {
e.preventDefault(); //prevent reloading
signup({name, email, password}); //give name, email and password to sign up
     }

const signUpForm = () => (
    <form>
        <div className="form-group">
<label className="text-muted">Name</label>
<input type="text" className="form-control" onChange={handleChange('name')}></input>
        </div>

        <div className="form-group">
<label className="text-muted">Email</label>
<input type="email" className="form-control" onChange={handleChange('email')}></input>
        </div>

        <div className="form-group">
<label className="text-muted">Password</label>
<input type="password" className="form-control" onChange={handleChange('password')}></input>
        </div>
        <button btn btn-primary onClick={handleSubmit}>Submit</button>
    </form>
)

 return (
     <Layout title="Sign Up" description="Sign Up to E-commerce website with Node and React"
     className="container col-md-8 offset-md-2">
{signUpForm()}
{JSON.stringify(values)} 
     </Layout>
 )
 }
export default Signup