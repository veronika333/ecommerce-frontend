import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { createProduct } from './apiAdmin';

const AddProduct = () => {

    const {user, token} = isAuthenticated(); //destructing
const [values, setValues] = useState({ //object with properties of the product
name: '',
description: '',
price: '',
categories: [],
category: '',
shipping: '',
quantity: '',
photo: '',
loading: false,
error: '',
createdProduct: '', //to inform the user that the product was created
redirectToProfile: false,
formData: '' //empty at the beginning
})
//destruct values from the state, so that it's easy to use in the form
const {
   name, description, price, categories, category, shipping, 
   quantity, loading, error, createdProduct, redirectToProfile,
   formData 
} = values;

//useEffect runs everytime when the component mount (value changes)
useEffect(() => { //update formData
setValues({...values, formData: new FormData()})
}, [])

//higher order function. grabs name, reterns another function, grabs event
const handleChange = name => event => { //if its a photo, grab files and the first one
const value = name === 'photo' ? event.target.files[0] : event.target.value //otherwise grab value
formData.set(name, value) //using method set to set the name and value
//set the state, first grab the values in the state, then name
setValues({...value, [name]: value}) //based on the evaluation, set the value
}

const handleSubmit = (event) => {

}

//creating form
const newPostForm = () => (
    <form className="mb-3" onSubmit={handleSubmit}>
<h4>Post Photo</h4>

<div className="form-group">
<label className="btn btn-secondary">
{/* accept="image/*" accepts everything that starts with image */}
<input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" /> 
</label>
</div>

<div className="form-group">
    <label className="text-muted">Name</label>
    <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
</div>

<div className="form-group">
    <label className="text-muted">Description</label>
    <textarea onChange={handleChange('description')} className="form-control" value={description} />
</div>

<div className="form-group">
    <label className="text-muted">Price</label>
    <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
</div>

<div className="form-group">
    <label className="text-muted">Category</label>
    <select onChange={handleChange('category')} className="form-control">
    {/* need to get categories from backend below */}
    <option value=""></option>
    </select>
</div>

<div className="form-group">
    <label className="text-muted">Shipping</label>
    <select onChange={handleChange('shipping')} className="form-control">
    <option value="0">No</option>
    <option value="1">Yes</option>
    </select>
</div>

<div className="form-group">
    <label className="text-muted">Quantity</label>
    <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
</div>

<button className="btn btn-outline-primary">Create Product</button>

    </form>
)

    return (
        <Layout title="Add a new product" description={`Hello ${user.name}! Are you ready to add a new product?`}>
        <div className="row">
        <div className="col-md-8 offset-md-2"> 
        {newPostForm()}
        </div>
        </div>
                </Layout>
    )
}

export default AddProduct;