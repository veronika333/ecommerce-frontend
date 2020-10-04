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

const searchSubmit = () => {

}

const handleChange = () => {

}

const searchForm = () => (
    <form onSubmit={searchSubmit}>
        <span className="input-group-text">
<div className="input-group input-group-lg">
<div className="input-group-prepend">
<select className="btn mr-2" onChange={handleChange("category")}>
    <option value="All">Pick Category</option>
    {categories.map((category, index) =>(
     <option key={index} value={category._id}>{category.name}</option>   
    ))}
</select>
</div>

 <input type="search" 
        className="form-control"
        onChange={handleChange("search")}
        placeholder="Search by name" />
</div>
<div className="btn input-group-append" style={{border:'none'}}>
<button className="input-group-text">Search</button>
</div>
        </span>
       
    </form>
)

    return (
        <div className="row">
            <div className="container mb-3">
                {searchForm()}
            </div>
        </div>
    )
}

export default Search;