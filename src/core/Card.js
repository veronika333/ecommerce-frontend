import React from 'react';
import {Link} from 'react-router-dom';
import ShowImage from './ShowImage';

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
    
    return (
        
<div className="card">
    <div className="card-header">{product.name}</div>
    <div className="card-body">
        <ShowImage item={product} url="product" />
        <p>{product.description.substring(0, 100)}</p>
    <p>{product.price}€</p>
   
{showViewButton(showViewProductButton)}
    <button className="btn btn-outline-warning mt-2 mb-2">Add to Card</button>
    </div>
</div>
      
    )
}
export default Card;