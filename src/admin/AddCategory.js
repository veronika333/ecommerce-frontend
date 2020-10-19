import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
const [name, setName] = useState('')
const [error, setError] = useState(false)
const [success, setSuccess] = useState(false)

//desctucture user and token from localstorage
const {user, token} = isAuthenticated()

const handleChange = (e) => {
setError('')
setName(e.target.value)
}

const handleSubmit = (e) => {
e.preventDefault();
setError('');
setSuccess(false);
//make request to api to create category, using imported createCategory()
createCategory(user._id, token, {name})
.then(data => {
    if(data.error) {    //if error, then set state true
        setError(true)
    } else {
        setError('');
        setSuccess(true);
    }
})
}

const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
<label className="text-muted">Name</label>
<input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />
        </div>
        <button className="btn btn-outline-primary">Create Category</button>
    </form>
);

const showSuccess= () => {
  if(success){
  return <h3 className="text-success">The category {name} is created</h3>
  }  
}

const showError= () => {
    if(error){
    return <h3 className="text-danger">The category {name} already exists</h3>
    }  
  }

  const goBack = () => (
    <div className="mt-5">
<Link to="/admin/dashboard" className="link-back">Back to Dashboard</Link>
    </div> 
  );

return (
    <Layout title="Add a new category" description={`Hello ${user.name}! Are you ready to add a new category`}>
    <div className="row">
    <div className="col-md-8 offset-md-2"> 
    {showSuccess()}
    {showError()}
    {newCategoryForm()}
    {goBack()}
    </div>
    </div>
            </Layout>
)
};
export default AddCategory;