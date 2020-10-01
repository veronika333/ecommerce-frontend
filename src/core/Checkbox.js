import React, { useState, useEffect } from 'react';

//props - categories from the Shop; look through categories and return all of them
const Checkbox = ({categories}) => {
return categories.map((category, index) => (
    <li key={index} className="list-unstyled">
       <input type="checkbox" className="form-check-input" /> 
<lable className="form-check-label">{category.name}</lable>
    </li>
))
}

export default Checkbox;