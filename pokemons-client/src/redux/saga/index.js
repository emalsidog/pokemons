// Dependencies
import { all } from "redux-saga/effects";

// Watchers
import { userUpdateWatcher } from "./user-update-saga";
import { pokemonsWatcher } from "./pokemons-saga";
import { battlesWatcher } from "./battles-saga";
import { authWatcher } from "./auth-saga";
import { usersWatcher } from "./users-saga";

export function* rootWatcher() {
	yield all([
		userUpdateWatcher(),
		pokemonsWatcher(),
		battlesWatcher(),
		authWatcher(),
		usersWatcher()
	]);
}
