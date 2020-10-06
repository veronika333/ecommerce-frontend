import React, { useState, useEffect } from 'react';

//props - categories from the Shop; look through categories and return all of them
const Checkbox = ({categories, 
    handleFilters
}) => {
 const [checked, setChecked] = useState([])

 //gets the category and returns another function
 //it will fire every time when there is onChange event in input
 const handleToggle = category => () => {
const currentCategoryId = checked.indexOf(category) //check if the category is already in the state; if it's not found in the state , it will return -1; otherwise returns the first index found
const newCheckedCategoryId = [...checked] 
//if now checked was not in checked state, then pushing
//otherwise pull
if(currentCategoryId === -1) {
newCheckedCategoryId.push(category)
} else { //if it was already there( it was checked) . if it was checked, need to uncheck
newCheckedCategoryId.splice(currentCategoryId, 1)} //grab one item and take it off
// }
console.log(newCheckedCategoryId) //shows array of category IDs
setChecked(newCheckedCategoryId)
handleFilters(newCheckedCategoryId)
}
    
return categories.map((category, index) => (
    <li key={index} className="list-unstyled">
       <input 
    onChange={handleToggle(category._id)} 
    value={checked.indexOf(category._id === -1)} 
       type="checkbox" 
       className="form-check-input" /> 
<label className="form-check-label">{category.name}</label>
    </li>
));
}

export default Checkbox;