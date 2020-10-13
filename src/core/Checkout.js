import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
} from "./apiCore";
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
        setData({ clientToken: data.clientToken }); //gotten from the backend
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  //@Calculate total price for products
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

  //@Buy func- to send nonce to server - nonce:data.instance.requestPaymentMethod()
  const buy = () => {
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data);
        nonce = data.nonce;
        //once you get the nonce (card type, card nmber) send nonce as 'PaymentMethodNonce'
        // also send the total amount to be charged to the backend

        // console.log(
        //   "Send nonce and total process: ",
        //   nonce,
        //   getTotal(products)
        // );

        //send data to the backend when the 'buy' button is clicked
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            setData({ ...data, success: response.success });

            //empty cart

            //create a new order
          })

          .catch((error) => console.log(error));
      })
      .catch((error) => {
        // console.log("DropIn error: ", error);
        setData({ ...data, error: error.message });
      });
  };

  //@show drop in UI - when the data contains a token - used inshowCheckOt above
  //blur out error message when any part of the page is clicked
  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)} //replaces the state of the instance
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  //@Checkout error message - if any
  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  //@Checkout success message - if payment was successful
  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your Payment was successful!
    </div>
  );

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
