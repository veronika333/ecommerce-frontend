import { API } from "../config";
import queryString from "query-string";

//load products by sell and by arrival
export const getProducts = (sortBy) => {
  //passing parameters
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET",
  })
    .then((response) => {
      //if get response, return it in json
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      //if get response, return it in json
      return response.json();
    })
    .catch((err) => console.log(err));
};

//default value of emty object
export const getFilteredProducts = (skip, limit, filters = {}) => {
  //user(javascript object, then convert to json) comes from signup({name, email, password})
  const data = {
    limit,
    skip,
    filters,
  };
  return (
    fetch(`${API}/products/by/search`, {
      method: "POST",
      headers: {
        Accept: "application/json", //api responds with json data, so need to accept it
        "Content-Type": "application/json",
      },
      //the actual data in the body, need to send it as a json string
      body: JSON.stringify(data),
    })
      //get either success or error
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      })
  );
};

export const list = (params) => {
  //passing parameters
  const query = queryString.stringify(params); //to send a proper query string to backend
  console.log("query", query);
  return fetch(`${API}/products/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      //if get response, return it in json
      return response.json();
    })
    .catch((err) => console.log(err));
};

//@Braintree request to the backend to get braintree token for auth
export const getBraintreeClientToken = async (userId, token) => {
  try {
    const response = await fetch(`${API}/braintree/getToken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

//@Process payment
export const processPayment = async (userId, token, paymentData) => {
  try {
    const response = await fetch(`${API}/braintree/payment/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};


export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(response => { //if get response, return it in json
        return response.json();
    })
    .catch(err => console.log(err))
};


// export const listRelated = (productId) => { //pass productId as a parameter
//     return fetch(`${API}/products/related/${productId}`, {
//         method: "GET"
//     })
//     .then(response => { //if get response, return it in json
//         return response.json();
//     })
//     .catch(err => console.log(err))
// };
export const listRelated = (productId) => { //pass productId as a parameter
  return fetch(`${API}/products/related/${productId}`, {
      method: "GET"
  })
  .then(response => { //if get response, return it in json
      return response.json();
  })
  .catch(err => console.log(err))
};

//@Send order information to the backend to show what the user is purchasing
export const createOrder = async (userId, token, createOrderData) => {
  try {
    const response = await fetch(`${API}/order/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        order: createOrderData,
      }),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

