const initialState = "";

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return action.payload;
    case "CLEAR_TOKEN":
      return "";
    default:
      return state;
  }
};

export default tokenReducer;