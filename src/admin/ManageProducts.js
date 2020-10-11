import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { getProduct, deleteProduct, getProducts } from './apiAdmin';


const ManageProducts = () => {
    //when the component mount, need to get all the product, store in the state
    const [products, setProducts] = useState([])

    const { user, token } = isAuthenticated() //need to use for destroy function

    const loadProducts = () => {
        getProducts()
        .then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setProducts(data) //populating products in the state
            } //has to be excecuted when the component mounts
        })
    }

    const destroy = productId => {
        deleteProduct(productId, user._id, token)
        .then(data=> {
            if(data.error){
                console.log(data.error)
            } else {
                loadProducts()
            }
        })
    }

useEffect(() => {
loadProducts()
}, [])

    
    return (
        <Layout title="Manage Products" 
        description="Perform CRUD on products" 
        className="container-fluid">
<div className="row">
    <div className="col-12">
<ul className="list-group">
    {products.map((product, index) => (
<li key={index} className="list-group d-flex justify-content-between
align-items-center">
<strong>{product.name}</strong>
<Link to={`/admin/product/update/${product._id}`}>
    <span className="badge badge-warning badge-pill">
        update
    </span>
    <span onClick={() => destroy(product._id)} className="badge badge-danger badge-pill">
delete
    </span>
</Link>
</li>
    ))}

</ul>
    </div>
</div>
</Layout>
    )}

export default ManageProducts;