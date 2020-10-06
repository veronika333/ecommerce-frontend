import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {read} from './apiCore';
import Card from './Card';


const Product = (props) => {
    const [product, setProduct] = useState({}) //state to hold product
    const [error, setError] = useState(false) //state for error

const loadSingleProduct = productId => {
    read(productId).then(data => { //read function is in apiCore file
        if(data.error){
            setError(data.error)
        } else {
            setProduct(data)
        }
    })

}

useEffect(() => {
const productId = props.match.params.productId //grabbing from url when component mounts
loadSingleProduct(productId)
}, [])

    return (
        <Layout title="Home Page" 
        descriptio="Node React E-commerce App" 
        className="container-fluid">
<h2 className="mb-4">Single Products</h2>
<div className="row">
{JSON.stringify(product)}
</div>

        </Layout>
    )
}

export default Product;