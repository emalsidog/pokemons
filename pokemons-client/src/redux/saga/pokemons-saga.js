// Dependencies
import { put, takeEvery, call } from "redux-saga/effects";

// Actions
import * as actions from "../actions/pokemons-actions";
import { updateWarParticipantSuccess } from "../actions/user-update-actions";
import { addNotification } from "../actions/notification-actions";

// Types
import * as types from "../constants/pokemons-constants";

// Utils
import { isUnauthorized } from "../utils/is-unauthorized";
import { AxiosGetRequest, AxiosPostRequest } from "../utils/server-request";

// Watcher
export function* pokemonsWatcher() {
	yield takeEvery(types.GET_POKEMONS_REQUEST, getPokemons);

	yield takeEvery(types.GET_FAVOURITE_POKEMONS_REQUEST, getFavouritePokemons);
	yield takeEvery(types.ADD_TO_FAVOURITE_REQUEST, addToFavourite);
	yield takeEvery(types.REMOVE_FROM_FAVOURITE_REQUEST, removeFromFavourite);

	yield takeEvery(types.GET_TEAM_POKEMONS_REQUEST, getTeamPokemons);
	yield takeEvery(types.ADD_TO_TEAM_REQUEST, addToTeam);
    yield takeEvery(types.REMOVE_FROM_TEAM_REQUEST, removeFromTeam);
}

// GET POKEMONS
function* getPokemons({ data }) {
	const { page, limit = 12 } = data;
	try {
		const { data } = yield call(() =>
			AxiosGetRequest(`/pokemons?page=${page}&limit=${limit}`)
		);

		yield put(actions.getPokemonsSuccess(data.body));
	} catch (error) {
		isUnauthorized(error.response.status);

		yield put(actions.getPokemonsFailure());
		yield put(addNotification(error.response.data.status));
	}
}

// GET FAVOURITE POKEMONS
function* getFavouritePokemons({ sort }) {
	try {
		const { data } = yield call(() =>
			AxiosGetRequest(`/pokemons/favourite?sort=${sort}`)
		);
		const { favouritePokemons } = data.body;

		yield put(actions.getFavouritePokemonsSuccess(favouritePokemons));
	} catch (error) {
		isUnauthorized(error.response.status);

		yield put(actions.getFavouritePokemonsFailure());
		yield put(addNotification(error.response.data.status));
	}
}

// ADD TO FAVOURITE
function* addToFavourite({ pokemonId }) {
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/pokemons/favourite/add", {
				pokemonId,
			})
		);
		const { body, status } = data;

		yield put(actions.addToFavouriteSuccess(body));
		yield put(addNotification(status));
	} catch (error) {
		isUnauthorized(error.response.status);

		yield put(actions.addToFavouriteFailure());
		yield put(addNotification(error.response.data.status));
	}
}

// REMOVE FROM FAVOURITE
function* removeFromFavourite({ pokemonId }) {
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/pokemons/favourite/remove", {
				pokemonId,
			})
		);
		const { body, status } = data;

		yield put(actions.addToFavouriteSuccess(body));
		yield put(addNotification(status));
	} catch (error) {
		isUnauthorized(error.response.status);

		yield put(actions.removeFromFavouriteFailure);
		yield put(addNotification(error.response.data.status));
	}
}

// GET TEAM
function* getTeamPokemons() {
	try {
		const { data } = yield call(() => AxiosGetRequest("/pokemons/team"));

		yield put(actions.getTeamPokemonsSuccess(data.body.teamPokemons));
	} catch (error) {
		isUnauthorized(error.response.status);

		yield put(actions.getTeamPokemonsFailure());
	}
}

// ADD TO TEAM
function* addToTeam({ pokemonId }) {
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/pokemons/team/add", {
				pokemonId,
			})
		);

		const {
			body: { teamPokemons, warParticipant },
			status,
		} = data;

		yield put(actions.addToTeamSuccess(teamPokemons));
		yield put(updateWarParticipantSuccess({ warParticipant }));

		yield put(addNotification(status));
	} catch (error) {
		isUnauthorized(error.response.status);

		yield put(actions.addToTeamFailure());
		yield put(addNotification(error.response.data.status));
	}
}

// REMOVE FROM TEAM
function* removeFromTeam({ pokemonId }) {
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/pokemons/team/remove", {
				pokemonId,
			})
		);

        const { body: { teamPokemons, warParticipant }, status } = data;

        yield put(actions.removeFromTeamSuccess(teamPokemons));
        yield put(updateWarParticipantSuccess({ warParticipant }));

        yield put(addNotification(status));
	} catch (error) {
		isUnauthorized(error.response.status);

		yield put(actions.removeFromFavouriteFailure());
		yield put(addNotification(error.response.data.status));
	}
}
