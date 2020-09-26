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

//for keeping data in local storage. 2 arguments: data and callback(next)
export const authenticate = (data, next) => {
    //first check if there is a window object
    //because local storage is a property of browser window object
if(typeof window !== "undefined"){
    localStorage.setItem('myDataKey', JSON.stringify(data)); //from localStorage documentation: two arguments: key and data
//using JSON stringify tosave a json data (convert javascript object to json)
next();
}
}


export const signout = (next) => {
    if(typeof window !== "undefined") {
        localStorage.removeItem("myDataKey");   //remove from local storage
        next(); //to later redirect the user
return fetch(`${API}/signout`, {method:'GET'})
.then(response => console.log("signout", response))
.catch(error => console.log(error)) 
    }
}


export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    } 
    if(localStorage.getItem('myDataKey')){
        return JSON.parse(localStorage.getItem('myDataKey'))
    } else {
        return false;
    }
};