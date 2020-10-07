import React from 'react';
import {Link} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment'; //time and date displayed user friendly (npm install moment)

//default value of showViewProductButton is true. prom comes from Product component
const Card = ({ product, showViewProductButton = true}) => {
    
    const showViewButton = (showViewProductButton) => {
        return ( //if it's true then show
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                <button className="btn btn-outline-primary mt-2 mb-2 mr-2">View Product</button>
                </Link>
            )
        )
    }
    
const showAddToCartButton = () => {
    return (
<button className="btn btn-outline-warning mt-2 mb-2">
        Add to Cart
</button>
    )
};

const showStock = (quantity) => {
    return quantity > 0 ? 
(<span className="badge-primary badge-pill">In stock: {quantity}</span>) :
    (<span>Out of stock</span>)
}

    return ( 
<div className="card">
    <div className="card-header name">{product.name}</div>
    <div className="card-body">
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
    <p className="black-10">{product.price}€</p>
    <p className="black-9">
        Category: {product.category && product.category.name}
    </p>
    <p className="black-8">
        Added: {moment(product.createdAt).fromNow()} 
    </p>
{showStock(product.quantity)}   
<br />    
{showViewButton(showViewProductButton)}
{showAddToCartButton()}
  
    </div>
</div>
      
    )
}
export default Card;