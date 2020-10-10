import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment'; //time and date displayed user friendly (npm install moment)
import { addItem, updateItem, removeItem } from './cartHelpers';

//showAddToCart props from Cart component; cartUpdate props from Cart component
//default value of showViewProductButton is true. prom comes from Product component
const Card = ({ 
    product, 
    showViewProductButton = true, 
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f, //default value of function
    run = undefined //default vallue of undefined
}) => {
 const [redirect, setRedirect] = useState(false);
 const [count, setCount] = useState(product.count);   //default value is what's already there, produc is coming from localStorage "cart"
    
    const showViewButton = (showViewProductButton) => {
        return ( //if it's true then show
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                <button className="btn btn-outline-primary mt-2 mb-2 mr-2">View Product</button>
                </Link>
            )
        )
    }
    
// const addToCart = () => { //argument product, it's in this component props
//     addItem(product, () => {//second argument callback function, as it is in addItem function (cardHelspers.js)
// //in callback redirect to state
// setRedirect(true)
//     }) 
// }

const addToCart = () => {
    addItem(product, () => {setRedirect(true)});
}

//first make sure getting redirect
const shouldRedirect = redirect => {
if(redirect){
    return <Redirect to="/cart" />
}
}

const showAddToCart = (showAddToCartButton) => {
    return showAddToCartButton && (
<button onClick={addToCart} 
className="btn btn-outline-warning mt-2 mb-2">
        Add to Cart
</button>
    )
};

const showRemoveButton = (showRemoveProductButton) => {
    return (showRemoveProductButton && (
<button 
onClick={() => {
    removeItem(product._id);
    setRun(!run);
}} 
className="btn btn-outline-danger mt-2 mb-2">
        Remove product
</button>
    ))
};

const showStock = (quantity) => {
    return quantity > 0 ? 
(<span className="badge-primary badge-pill">In stock: {quantity}</span>) :
    (<span>Out of stock</span>)
}

//higher order function, returning another function. 
const handleChange = productId => event => {
    setRun(!run); //run useEffect in parent Cart
//set count, update the state
//user cannot update product quantity to negative or 0; if it's smaller than 1, using 1 as default
setCount(event.target.value < 1 ? 1 : event.target.value) //whatever user types in input, grabbibg the event
if(event.target.value >= 1) {
    updateItem(productId, event.target.value)
}
}

const showCartUpdatedOptions = (cartUpdate) => {
return (cartUpdate && (
<div>
    <div className="input-group mb-3 mt-3">
        <div className="input-group-prepend">
<span className="input-group-text">Adjust quantity</span>
        </div>
<input type="number" className="form-control" value={count} onChange={handleChange(product._id)} /> 
    </div>
</div>
    ))
}

    return ( 
<div className="card">
    <div className="card-header name">{product.name}</div>
    <div className="card-body">
        {shouldRedirect(redirect)}
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
{showAddToCart(showAddToCartButton)} 
{showCartUpdatedOptions(cartUpdate)} 
 {showViewButton(showViewProductButton)}
{showRemoveButton(showRemoveProductButton)}
    </div>
</div>
      
    )
}
export default Card;