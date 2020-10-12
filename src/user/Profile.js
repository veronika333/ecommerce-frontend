import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

//@Profile comp for the user dashboard
const Profile = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: "",
  });

  const { token } = isAuthenticated();
  const { name, email, password, error, success } = values;

  //@init to make request to the backend, using the userId from the read method
  const init = (userId) => {
    //console.log(userId);

    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  //@useEffect to update changes made to the function(s) passed to its
  useEffect(() => {
    init(props.match.params.userId); //:userId - as used in the Route (profile/:userId)
  }, []);

  //@handleChange function - higher order function
  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      error: false,
      [name]: e.target.value,
    });
  };

  //@submit button handler
  const clickSubmit = (e) => {
    e.preventDefault();
    update(props.match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          //update in the local storage too - newly input data
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  //@Redirect user if update was successful - line 61
  const redirectUser = (success) => {
    if (success) {
      console.log("Successfully updated"); //REDIRECT NOT WORKING, COME BACK!!
      //   return <Redirect to="/shop" />;
      return (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      );
    }
  };

  //@Function (form) to update user's profile
  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      <h2 className="mb-4">Profile Update</h2>
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
