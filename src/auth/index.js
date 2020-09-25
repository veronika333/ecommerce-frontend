import { API } from '../config';

export const signup = (user) => { //user(javascript object, then convert to json) comes from signup({name, email, password})
    //console.log(user);
return fetch(`${API}/signup`, {
method: "POST",
headers: {
    Accept: 'application/json', //api responds with json data, so need to accept it
    "Content-Type": "application/json" 
},
//the actual data in the body, need to send it as a json string
body: JSON.stringify(user)
})
//get either success or error
.then(response => {
    return response.json()
})
.catch(err => {
    console.log(err);
});
};


export const signin = (user) => { //user(javascript object, then convert to json) comes from signin({email, password})
    //console.log(user);
return fetch(`${API}/signin`, {
method: "POST",
headers: {
    Accept: 'application/json', //api responds with json data, so need to accept it
    "Content-Type": "application/json" 
},
//the actual data in the body, need to send it as a json string
body: JSON.stringify(user)
})
//get either success or error
.then(response => {
    return response.json()
})
.catch(err => {
    console.log(err);
});
};