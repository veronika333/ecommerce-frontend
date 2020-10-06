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
        <Layout title={product && product.name} 
        descriptio={product &&
            product.description && product.description.substring(0, 100)} 
        className="container-fluid">

<div className="row">
{product && product.description &&
<Card product={product} showViewProductButton={false} />
}
</div>

        </Layout>
    )
}

export default Product;