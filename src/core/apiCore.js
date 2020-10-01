import { API } from '../config';

//load products by sell and by arrival
export const getProducts = (sortBy) => { //passing parameters
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
    .then(response => { //if get response, return it in json
        return response.json();
    })
    .catch(err => console.log(err))
};


export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => { //if get response, return it in json
        return response.json();
    })
    .catch(err => console.log(err))
};