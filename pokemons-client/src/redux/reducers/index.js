// Dependencies 
import { combineReducers } from "redux";

// Reducers
import auth from "./auth-reducer";

const rootReducer = combineReducers({ auth });

export default rootReducer;