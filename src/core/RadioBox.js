import React, { useState, useEffect } from 'react';

//prices as props from the Shop component
const RadioBox = ({ prices, handleFilters}) =>{
    const [value, setValue] = useState(0);

const handleChange = (event) => { //any time when use types input, the value will be sent toparent component
handleFilters(event.target.value)
setValue(event.target.value) //update the state
}

    return prices.map((p, index) => (
        <div key={index}>
       
        <input 
        onChange={handleChange} 
        value={`${p._id}`} 
        name={p}
        type="radio" className="mr-2 ml-4" /> 
    <label className="form-check-label">{p.name}</label>
        </div>
    //     <div key={index}>
    //        <input onChange={handleChange} 
    //        value={`${p._id}`} 
    //        name={p}
    //        type="radio" className="mr-2 ml-4" /> 
    // <lable className="form-check-label">{p.name}</lable>
    //     </div>
    ))
}
export default RadioBox;