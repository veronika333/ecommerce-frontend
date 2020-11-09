export const addItem = (item, next) => {
  //add  item to local storage. need item(product), use callback to do something when
  let cart = []; //empty cart
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      //getItem() method to get item from localStorage. name of the item
      cart = JSON.parse(localStorage.getItem("cart")); //populate all products in cart variable, had to be in json format
    }
    cart.push({
      //add item, push new item
      ...item, //item from the parameter
      count: 1, //by default 1
    });

    //create a new array to make sure there is no duplicate, when item clicked twice
    //create new array. Set automatically removes the duplicate. Then again map on the
    //new array and return cart using find method and compare id with id from new array
    cart = Array.from(new Set(cart.map((product) => product._id))).map((id) => {
      return cart.find((product) => product._id === id); //compara the _id got to id from the array
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

//get total number of items in the cart
export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      //checking if there are any items in the cart
      return JSON.parse(localStorage.getItem("cart")).length; //grabbing length
    }
  }
  return 0; //otherwise return 0 by defaukt
};

//get the cart from the local storage
export const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      //checking if there are any items in the cart
      return JSON.parse(localStorage.getItem("cart")); //grabbing length
    }
  }
  return []; //if there are no items in the cart, return empty array
};

export const updateItem = (productId, count) => {
  let cart = []; //cart is empty array to start
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      //if there is cart in the localStorage
      cart = JSON.parse(localStorage.getItem("cart")); //get the value and put into cart variable
    }
    cart.map((product, index) => {
      //map through each and match product id
      if (product._id === productId) {
        //if matches
        cart[index].count = count; //updating product count
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart)); //setting back localStorage
  }
};

export const removeItem = (productId) => {
  let cart = []; //cart is empty array to start
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      //if there is cart in the localStorage
      cart = JSON.parse(localStorage.getItem("cart")); //get the value and put into cart variable
    }
    cart.map((product, index) => {
      //map through each and match product id
      if (product._id === productId) {
        //if matches
        cart.splice(index, 1); //get one particular item and take it out
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart)); //setting back localStorage
  }
  return cart;
};

//@Empty cart once payment is successful - use in checkout.js
export const emptyCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    next();
  }
};
