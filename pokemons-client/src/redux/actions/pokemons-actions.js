// Constants
import * as types from "../constants/pokemons-constants";
import { UPDATE_WAR_PARTICIPANT_SUCCESS } from "../constants/user-update-constants";

// Actions
import { addNotification } from "../actions/notification-actions";

// Utils
import { AxiosGetRequest, AxiosPostRequest } from "../utils/server-request";
import { isUnauthorized } from "../utils/is-unauthorized";

// GET POKEMONS
export const getPokemonsAction = ({ page, limit = 12 }) => {
	return async (dispatch) => {
		dispatch({ type: types.GET_POKEMONS_REQUEST });
		try {
			const { data } = await AxiosGetRequest(
				`/pokemons?page=${page}&limit=${limit}`
			);
			dispatch({ type: types.GET_POKEMONS_SUCCESS, data: data.body });
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: types.GET_POKEMONS_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};

// GET FAVOURITE POKEMONS
export const getFavouritePokemons = (sort = "a-z") => {
	return async (dispatch) => {
		dispatch({ type: types.GET_FAVOURITE_POKEMONS_REQUEST });
		try {
			const { data } = await AxiosGetRequest(
				`/pokemons/favourite?sort=${sort}`
			);
			const { body } = data;

			dispatch({
				type: types.GET_FAVOURITE_POKEMONS_SUCCESS,
				favouritePokemons: body.favouritePokemons,
			});
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: types.GET_FAVOURITE_POKEMONS_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};

// ADD FAVOURITE POKEMONS
export const addToFavourite = (pokemonId) => {
	return async (dispatch) => {
		dispatch({ type: types.ADD_TO_FAVOURITE_REQUEST });
		try {
			const { data } = await AxiosPostRequest("/pokemons/favourite/add", {
				pokemonId,
			});

			const { body, status } = data;

			dispatch({ type: types.ADD_TO_FAVOURITE_SUCCESS, body });
			dispatch(addNotification(status));
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: types.ADD_TO_FAVOURITE_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};

// REMOVE FAVOURITE POKEMONS
export const removeFromFavourite = (pokemonId) => {
	return async (dispatch) => {
		dispatch({ type: types.REMOVE_FROM_FAVOURITE_REQUEST });
		try {
			const { data } = await AxiosPostRequest(
				"/pokemons/favourite/remove",
				{
					pokemonId,
				}
			);

			const { body, status } = data;

			dispatch({ type: types.REMOVE_FROM_FAVOURITE_SUCCESS, body });
			dispatch(addNotification(status));
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: types.REMOVE_FROM_FAVOURITE_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};

// GET TEAM POKEMONS
export const getTeamPokemons = () => {
	return async (dispatch) => {
		dispatch({ type: types.GET_TEAM_POKEMONS_REQUEST });
		try {
			const { data } = await AxiosGetRequest("/pokemons/team");
			const { body } = data;

			dispatch({
				type: types.GET_TEAM_POKEMONS_SUCCESS,
				teamPokemons: body.teamPokemons,
			});
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: types.GET_TEAM_POKEMONS_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};

// ADD TO TEAM
export const addToTeam = (pokemonId) => {
	return async (dispatch) => {
		dispatch({ type: types.ADD_TO_TEAM_REQUEST });
		try {
			const { data } = await AxiosPostRequest("/pokemons/team/add", {
				pokemonId,
			});

			const { body, status } = data;

			dispatch({
				type: types.ADD_TO_TEAM_SUCCESS,
				teamPokemons: body.teamPokemons,
			});
			dispatch({
				type: UPDATE_WAR_PARTICIPANT_SUCCESS,
				body: { warParticipant: body.warParticipant },
			});

			dispatch(addNotification(status));
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: types.ADD_TO_TEAM_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};

// REMOVE FROM TEAM
export const removeFromTeam = (pokemonId) => {
	return async (dispatch) => {
		dispatch({ type: types.REMOVE_FROM_TEAM_REQUEST });
		try {
			const { data } = await AxiosPostRequest("/pokemons/team/remove", {
				pokemonId,
			});

			const { body, status } = data;

			dispatch({
				type: types.REMOVE_FROM_TEAM_SUCCESS,
				teamPokemons: body.teamPokemons,
			});
			dispatch({
				type: UPDATE_WAR_PARTICIPANT_SUCCESS,
				body: { warParticipant: body.warParticipant },
			});

			dispatch(addNotification(status));
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: types.REMOVE_FROM_TEAM_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};
