import { API } from '../config';

export const createCategory = (userId, token, category) => { //user(javascript object, then convert to json) comes from signup({name, email, password})
    //console.log(user);
return fetch(`${API}/category/create/${userId}`, {
method: "POST",
headers: {
    Accept: 'application/json', //api responds with json data, so need to accept it
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
},
//the actual data in the body, need to send it as a json string
body: JSON.stringify(category)
})
//get either success or error
.then(response => {
    return response.json()
})
.catch(err => {
    console.log(err);
});
};