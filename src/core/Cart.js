import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]); //get items from local storage and populate in the state
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart()); //set items in the state using getCart() from file cartHelpers
  }, [run]); //whenever there is a change in the items, run useEffect

  const showItems = (items) => {
    return (
      <div>
        <h2>You have {`${items.length}`} items in your cart.</h2>
        <hr />
        {items.map((product, index) => (
          <Card
            key={index}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };
  //if there are no items in local storage:
  const noItemsMessage = () => (
    <h2>
      Your cart is empty.
      <br />
      <Link to="/shop">Continue shopping</Link>
    </h2>
  );


  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add, remove, checkout."
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );

};

export default Cart;
