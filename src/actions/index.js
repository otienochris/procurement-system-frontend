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
        payload
      }
      case "CLEAR_TOKEN":
        return {
          type: "CLEAR_TOKEN",
          payload: ""
        }  
    default:
      break;
  }
}
