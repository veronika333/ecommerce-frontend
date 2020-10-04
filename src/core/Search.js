import React, {useState, useEffect} from 'react';
import {getCategories} from './apiCore';
import Card from './Card';

const Search = () => {
    const [data, setData] = useState({
      categories: [], //will make api request to get all the categories, to show list of categories
      category: '', //to store particular cattegory
      search: '', //alue in the search
      results: [], //when user clicks, gets all the products
      searched: false  
    });

    //destructing
    const {categories, category, search, results, searched} = data;  //easire to use instead of writinf ex. data.categories

const loadCategories = () => {
    getCategories().then(data => {
       if(data.error){
           console.log(data.error)
       } else {
           setData({...data, categories: data}) //populate categories with data
       }
    })
}
//need to have the method above, when the component mounts => useEffect
useEffect(() => {
loadCategories()
}, [])

    return (
        <div>
            <h2>Search bar {JSON.stringify(categories)}</h2>
        </div>
    )
}

export default Search;