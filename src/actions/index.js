export const isLoggedInActions = (name) => {
  switch (name) {
    case "SIGN_IN":
      return {
        type: "SIGN_IN",
        payload: true,
      };
    case "SIGN_OUT":
      return {
        type: "SIGN_OUT",
        payload: false,
      };
    default:
      break;
  }
};

export const tokenActions = (name, payload) => {
  switch (name) {
    case "SET_TOKEN":
      return {
        type: "SET_TOKEN",
        payload,
      };
    case "CLEAR_TOKEN":
      return {
        type: "CLEAR_TOKEN",
        payload: "",
      };
    default:
      break;
  }
};

export const userActions = (name, payload) => {
  switch (name) {
    case "SET":
      return {
        type: "SET",
        payload
      }
    case "SET_ROLE":
      return {
        type: "SET_ROLE",
        payload
      }
    case "SET_NAME":
      return {
        type: "SET_NAME",
        payload
      }
    case "SET_EMAIL":
      return {
        type: "SET_EMAIL",
        payload
      }
    case "SET_DATECREATED":
      return {
        type: "SET_DATECREATED",
        payload
      }
    case "SET_DESCRIPTION":
      return {
        type: "SET_DESCRIPTION",
        payload
      }
    case "SET_USERNAME":
      return {
        type: "SET_USERNAME",
        payload: payload,
      };
    case "CLEAR_USERNAME":
      return {
        type: "SET_USERNAME",
        payload: "",
      };
    default:
      break;
  }
};
