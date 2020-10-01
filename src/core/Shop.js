import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories } from "./apiCore";
import Checkbox from './Checkbox';

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

//pass the methode below to the checkbox
//filterBy - either by category or by price
const handleFilters = (filters, filterBy) => {
console.log("SHOP", filters, filterBy)
}

useEffect = (() => {
init()
}, [])

    return (
        <Layout title="Shop Page" descriptio="Shop and find makeups of your choice" className="container-fluid">

<div className="row">
    <div className="col-4">
        <h4>Filter by categories</h4>
<ul>
        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
</ul>
    </div> 
   <div className="col-8">right</div>
</div>

        </Layout>
    )
}

export default Shop;