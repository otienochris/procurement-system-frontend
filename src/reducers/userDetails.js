import React from "react";
const initialState = {
  username: "",
  role:"",
  name:"",
  email:"",
  description:"",
  dateCreated:""
};

const userDetails = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_ROLE":
      return {...state, role: action.payload}
    case "SET_NAME":
      return {...state, name: action.payload}
    case "SET_EMAIL":
      return {...state, email: action.payload}
    case "SET_DESCRIPTION":
      return {...state, description: action.payload}
    case "SET_DATECREATED":
      return {...state, dateCreated: action.payload}
    case "CLEAR_USERNAME":
      return { ...state, username:"" };
    case "SET":
      return action.payload
    case "CLEAR":
      return initialState
    default:
      return state;
  }
};

export default userDetails;
