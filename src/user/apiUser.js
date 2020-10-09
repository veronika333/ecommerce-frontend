//--FILE TO GET REQUESTS FROM THE BACKEND

import { API } from "../config";

//@Read user's profile
export const read = async (userId, token) => {
  try {
    const response = await fetch(`${API}/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

//@Update user's profile saved in the backend
export const update = async (userId, token, user) => {
  try {
    const response = await fetch(`${API}/user/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    console.log(response);
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

//@Update user profile n the localStorage as well
//essential to do for users to see immediate changes to their updates without having to sign out first
export const updateUser = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt")); //update the user if there's jwt token
      auth.user = user; //change the jwt user property to the user (updated version)
      localStorage.setItem("jwt", JSON.stringify(auth)); //set the updated version as the new profile/user
      next();
    }
  }
};
