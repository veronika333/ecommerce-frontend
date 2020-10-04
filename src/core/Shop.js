import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from './fixedPrices';


const Shop = () => {
const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] } //filters contain categories and price
});
    //creating state to hold categories
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState(0);

//load categories 
const init = () => {
    getCategories()
    .then(data => {
        if(data.error){
            setError(data.error)
        } else {
         setCategories(data)   //need to do it when component mounts => useEffect
        }
    });
};

const loadFilteredResults = (newFilters) => {
   // console.log(newFilters)
   getFilteredProducts(skip, limit, newFilters).then(data => {
       if(data.error){
           setError(data.error)
       } else {
           //take everything in filteredResults and then pass the data
setFilteredResults(data.data); //checked in console in network, everytning inside data
setSize(data.size) //ow many products getting
setSkip(0) //later can use it to load more
}
   })
}
//load more method

const loadMore = () => {
   let toSkip = skip + limit //skip whatever is in the state + limit
    getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
        if(data.error){
            setError(data.error)
        } else {
 setFilteredResults([...filteredResults, ...data.data]); //check whatever is in the state and add data
 setSize(data.size)    //setting size again  
 setSkip(toSkip)
 }
    })
 }

const loadMoreButton = () => {
    return (
        size > 0 && size >= limit && (
            <button onClick={loadMore} className="btn btn-warning mb-5">Load more</button>
        )
    )
}

useEffect = (() => {
    init(); //run these function when the component mounts
    loadFilteredResults(skip, limit, myFilters.filters) //passing the arguments
    }, []);
//pass the methode below to the checkbox
//filterBy - either by category or by price
const handleFilters = (filters, filterBy) => {
//console.log("SHOP", filters, filterBy)
const newFilters = {...myFilters};
newFilters.filters[filterBy] = filters;

if(filterBy === "price"){
    let priceValues = handlePrice(filters);
    newFilters.filters[filterBy] = priceValues;
}
loadFilteredResults(myFilters.filters) //fetch filtered products
setMyFilters(newFilters)
}

//grabbing the value
const handlePrice = value => {
const data = prices;
let array = []

//looping prices
for(let key in data){ //looping through each
    if(data[key]._id === parseInt(value)){ //The parseInt function converts its first argument to a string, parses that string, then returns an integer or NaN
        //populate array 
        array = data[key].array
    }
}
return array; //return array after looping
}



    return (
        <Layout title="Shop Page" descriptio="Shop and find makeups of your choice" className="container-fluid">

<div className="row">
    <div className="col-4">

        <h4>Filter by categories</h4>
<ul>
        <Checkbox categories={categories} 
        handleFilters={filters => 
        handleFilters(filters, 'category')} />
</ul>

<h4>Filter by price range</h4>
<div>
        <RadioBox prices={prices} 
        handleFilters={filters => 
        handleFilters(filters, 'price')} />
</div>

    </div> 
   <div className="col-8">
   <h2 className="mb-4">Products</h2>
   <div className="row"> 
{filteredResults.map((product, index) => (
   
<Card key={index} product={product} />

))}
   </div>
   <hr />
   {loadMoreButton()}
   </div>
</div>

        </Layout>
    )
}

export default Shop;