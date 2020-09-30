import React from 'react';
import { API } from '../config';

//item =product, grabbing product id; url to make request to api/product..
const ShowImage = ({item, url}) => (
<div className="product-img"> 
<img src={`${API}/${url}/photo/${item._id}`} alt={item.name} //url from the backend, routes folder , file product.js
className="mb-3" style={{maxHeight: '100%', maxWidth: '100%'}} />
</div>
)

export default ShowImage;