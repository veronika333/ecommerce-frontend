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
    .catch((err) => console.log(err));
};

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
