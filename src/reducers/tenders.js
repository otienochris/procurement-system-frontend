const initialState = {}
const tendersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_TENDER":
      return state;
    case "ADD_TENDER":
      return state;
    case "FILTER_TENDERS":
      return state;
    case "EDIT_TENDER":
      return state;
    default:
      return state
  }
};


export default tendersReducer;