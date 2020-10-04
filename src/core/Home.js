import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';
import Search from "./Search";

const Home = () => {
const [productsBySell, setProductsBySell] = useState([])
const [productsByArrival, setProductsByArrival] = useState([])
   const [error, setError] = useState(false)

   const loadProductsBySell = () => {
       getProducts('sold').then(data => {
           if(data.error) {setError(data.error)}
           else {setProductsBySell(data)}
       })
   }

   const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
        if(data.error) {setError(data.error)}
        else {setProductsByArrival(data)}
    })
}
//run those two functions above when the component mounts
useEffect(() => {
loadProductsByArrival()
loadProductsBySell()
}, [])

return (
        <Layout title="Home Page" 
        descriptio="Node React E-commerce App" 
        className="container-fluid">

<Search />

<h2 className="mb-4">New Arrivals</h2>
<div className="row">
{productsByArrival.map((product, i) => ( //look through the products, when mapping through each product. get product and index 
    <Card key={i} product={product} /> //giving the key and sending product as props
))}
</div>

<h2 className="mb-4">Best Sellers</h2>
<div className="row">
    {productsBySell.map((product, i) => ( //look through the products, when mapping through each product. get product and index 
    <Card key={i} product={product} /> //giving the key and sending product as props
))}
</div>

        </Layout>
    )
}

export default Home;