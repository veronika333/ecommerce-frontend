import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';


const Product = (props) => {
    const [product, setProduct] = useState({}) //state to hold product
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error, setError] = useState(false) //state for error

const loadSingleProduct = productId => {
    read(productId).then(data => { //read function is in apiCore file
        if(data.error){
            setError(data.error)
        } else {
            setProduct(data); //setting product in the state
            //fetch relatedProducts; listRelated is in apiCOre
listRelated(data._id).then(data => {
    if(data.error){
        setError(data.error);
    } else { //populate
setRelatedProduct(data);
    }
}
)
        }
    })

}

useEffect(() => {
const productId = props.match.params.productId //grabbing from url when component mounts
loadSingleProduct(productId)
}, [props]) //props there, because whenever there is a change in the props, excecute useEffect

    return (
        <Layout title={product && product.name} 
        description={product &&
            product.description && product.description.substring(0, 100)} 
        className="container-fluid">

<div className="row">
<div className="col-8">
{product && product.description &&
<Card product={product} showViewProductButton={false} />}
</div>
<div className="col-4">
<h4>Related products</h4>
{relatedProduct.map((product, index) => (
    <div className="mb-3">
<Card key={index} product={product} />
    </div>
))} 
</div>

</div>

        </Layout>
    )
}

export default Product;