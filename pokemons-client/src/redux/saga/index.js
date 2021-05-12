// Dependencies
import { all } from "redux-saga/effects";

// Watchers
import { userUpdateWatcher } from "./user-update-saga";
import { pokemonsWatcher } from "./pokemons-saga";
import { battlesWatcher } from "./battles-saga";

export function* rootWatcher() {
	yield all([userUpdateWatcher(), pokemonsWatcher(), battlesWatcher()]);
}
