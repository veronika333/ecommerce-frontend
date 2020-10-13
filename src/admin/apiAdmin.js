import { API } from "../config";

export const createCategory = (userId, token, category) => {
  //user(javascript object, then convert to json) comes from signup({name, email, password})
  //console.log(user);
  return (
    fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json", //api responds with json data, so need to accept it
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //the actual data in the body, need to send it as a json string
      body: JSON.stringify(category),
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

//create product
export const createProduct = (userId, token, product) => {
  //user(javascript object, then convert to json) comes from signup({name, email, password})
  return (
    fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      //the actual data in the body
      body: product,
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

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      //if get response, return it in json
      return response.json();
    })
    .catch(err => console.log(err))
};


//get all the products, get a single product, update single product, delete single product

export const getProducts = () => {
    return fetch(`${API}/products?limit=100`, { //changing the limit, because it was set to 6
        method: "GET"
    })
    .then(response => { //if get response, return it in json
        return response.json();
    })
    .catch(err => console.log(err))
};

export const deleteProduct = (productId, userId, token) => {
return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
})
.then(response => {
    return response.json()
})
.catch(error => console.log(error));
}

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        methog: 'GET'
    })
    .then(response => {
        return response.json
    })
    .catch(error => console.log(error))
}

//the last argument - product. whatever changes will be made, need to send as product
// export const updateProduct = (productId, userId, token, product) => {
//     return fetch(`${API}/product/${productId}/${userId}`, {
//         method: "PUT",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: product //no json.stringify, because will have image => form data
//     })
//     .then(response => {
//         return response.json()
//     })
//     .catch(error => console.log(error));
//     }
    

//@Return all orders - req to the backend
export const listOrders = async (userId, token) => {
  try {
    const response = await fetch(`${API}/order/list/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

//@get all Status values from the backend - send t o Order comp
export const getStatusValues = async (userId, token) => {
  try {
    const response = await fetch(`${API}/order/status-values/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

//@Send put request to backed to update the order status
export const updateOrderStatus = async (userId, token, orderId, status) => {
  try {
    const response = await fetch(`${API}/order/${orderId}/status/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, orderId }),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

