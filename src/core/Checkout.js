import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getProducts, getBraintreeClientToken } from "./apiCore";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import DropIn from "braintree-web-drop-in-react";

//get all the products in the cart and calculate total
const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  //1. @State for token
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {}, //for react briantree drop
    address: "",
  });

  //2. @get client token from the backend, pass userId and token to func
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  //3. @gets userId and token - runs when there is a change in state
  // - make req to the backend with getbraintreeClient defined method
  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ ...data, clientToken: data.clientToken }); //gotten from the backend
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    //doc mozilla: array.prototype.reduce()
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  //@show DropIn interface if authenticated
  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  //@show drop in UI - when the data contains a token - used inshowCheckOt above
  const showDropIn = () => (
    <div>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)} //replaces the state of the instance
          />
          <button className="btn btn-success">Pay</button>
        </div>
      ) : null}
    </div>
  );

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
