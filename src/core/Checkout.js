import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getProducts, getBraintreeClientToken } from "./apiCore";
import Card from "./Card";
import { isAuthenticated } from "../auth";

//get all the products in the cart and calculate total
const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const getTotal = () => {
    //doc mozilla: array.prototype.reduce()
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Checkout</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
