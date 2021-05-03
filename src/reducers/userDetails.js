import React from "react";
const initialState = {
  username: "",
};

const userDetails = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "CLEAR_USERNAME":
      return { ...state, username:"" };
    default:
      return state;
  }
};

export default userDetails;
