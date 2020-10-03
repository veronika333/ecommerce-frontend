import React, { useState, useEffect } from 'react';

//prices as props from the Shop component
const RadioBox = ({ prices }) =>{
    const [value, setValue] = useState(0);

const handleChange = () => {

}

    return prices.map((p, index) => (
        <div key={index}>
           <input onChange={handleChange} 
           value={`${p._id}`} 
           type="radio" className="mr-2 ml-4" /> 
    <lable className="form-check-label">{p.name}</lable>
        </div>
    ))
}
export default RadioBox;