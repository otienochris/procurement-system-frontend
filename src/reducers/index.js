import tenders from "./tenders"
import isLoggedIn from "./isLogged"
import token from "./token"
import userDetails from "./userDetails"
import {combineReducers} from "redux"


const allReducers = combineReducers({
    tenders,
    isLoggedIn,
    token,
    userDetails 
})

export default allReducers;