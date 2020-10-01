import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories } from "./apiCore";

const Shop = () => {

    //creating state to hold categories
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

//load categories 
const init = () => {
    getCategories()
    .then(data => {
        if(data.error){
            setError(data.error)
        } else {
         setCategories(data)   //need to do it when component mounts => useEffect
        }
    })
}

useEffect = (() => {
init()
}, [])

    return (
        <Layout title="Shop Page" descriptio="Shop and find makeups of your choice" className="container-fluid">

<div className="row">
    <div className="col-4">{JSON.stringify(categories)}</div> 
   <div className="col-8">right</div>
</div>

        </Layout>
    )
}

export default Shop;