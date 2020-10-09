import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

//@Profile comp for the user dashboard
const Profile = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
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

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      <h2 className="mb-4">Profile Update</h2>
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Profile;
