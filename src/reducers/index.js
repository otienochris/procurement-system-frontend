import tenders from "./tenders"
import isLoggedIn from "./isLogged"
import token from "./token"
import {combineReducers} from "redux"


const allReducers = combineReducers({
    tenders,
    isLoggedIn,
    token 
})

export default allReducers;