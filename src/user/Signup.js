import React, {useState} from 'react';
import Layout from '../core/Layout';

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

     //function returning another function, grab the eventTypeName and then grab  event (higher order function)
     const handleChange = eventTypeName => event => {
setValues({...values, error: false, [eventTypeName]:event.target.value})
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
        <button btn btn-primary>Submit</button>
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