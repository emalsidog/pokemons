// Constants
import * as types from "../constants/team-pokemons-constants";

// Utils
import { AxiosPostRequest } from "../utils/server-request";
import { isUnauthorized } from "../utils/is-unauthorized";

export const addToTeam = (pokemonId) => {
	return async (dispatch) => {
		dispatch({ type: types.ADD_TO_TEAM_REQUEST });
		try {
			const { data } = await AxiosPostRequest("/pokemons/team/add", {
				pokemonId,
			});
			dispatch({
				type: types.ADD_TO_TEAM_SUCCESS,
				response: data,
			});
		} catch (error) {
			if (isUnauthorized(error.response.status)) {
				// ...
			}

			dispatch({
				type: types.ADD_TO_TEAM_FAILURE,
				status: error.response.data.status,
			});
		}
	};
};

export const removeFromTeam = (pokemonId) => {
	return async (dispatch) => {
		dispatch({ type: types.REMOVE_FROM_TEAM_REQUEST });
		try {
			const { data } = await AxiosPostRequest("/pokemons/team/remove", {
				pokemonId,
			});
			dispatch({
				type: types.REMOVE_FROM_TEAM_SUCCESS,
				response: data,
			});
		} catch (error) {
			if (isUnauthorized(error.response.status)) {
				// ...
			}

			dispatch({
				type: types.REMOVE_FROM_TEAM_FAILURE,
				status: error.response.data.status,
			});
		}
	};
};
