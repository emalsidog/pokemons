// Dependencies 
import { combineReducers } from "redux";

// Reducers
import auth from "./auth-reducer";
import user from "./user-reducer";
import pokemons from "./pokemons-reducer";
import users from "./users-reducer";
import battles from "./battles-reducer";

const rootReducer = combineReducers({ auth, user, pokemons, users, battles });

export default rootReducer;