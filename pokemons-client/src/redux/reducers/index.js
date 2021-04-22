// Dependencies 
import { combineReducers } from "redux";

// Reducers
import auth from "./auth-reducer";
import user from "./user-reducer";

const rootReducer = combineReducers({ auth, user });

export default rootReducer;