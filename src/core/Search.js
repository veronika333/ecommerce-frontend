import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [], //will make api request to get all the categories, to show list of categories
    category: "", //to store particular cattegory
    search: "", // in the search
    results: [], //when user clicks, gets all the products
    searched: false,
  });

  //destructing
  const { categories, category, search, results, searched } = data; //easire to use instead of writinf ex. data.categories

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data }); //populate categories with data
      }
    });
  };
  //need to have the method above, when the component mounts => useEffect
  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    //console.log(search, category);
    if (search || category) {
      //if have search, then excecute list with params
      list({ search: search || undefined, category: category }) //if nothing, then undefined
        .then((response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        });
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData(); //it makes api request
  };
  //name can be "category" or "search"
  //higher order function, grab name, grab event (function returning another function)
  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      //if returns any products, then can show info to user, how many
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      //if returns any products, then can show info to user, how many
      return `No products found`;
    }
  };

  //products are in results. in case there are no results - empty array as a default value
  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((
            product,
            index //map through, pass products as props
          ) => (
            <div key={index} className="col-4 mb-3"><Card product={product} /></div>
            
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="I'm looking for..."
          />
        </div>
        
          <button className="btn search-button">Search</button>
        
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
