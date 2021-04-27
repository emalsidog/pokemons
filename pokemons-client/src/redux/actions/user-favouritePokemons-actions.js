// Utils
import { AxiosPostRequest } from "../utils/server-request";
import { isUnauthorized } from "../utils/is-unauthorized";

// Constants
import * as types from "../constants/user-favouritePokemons-constants";

export const addToFavourite = (pokemonId) => {
	return async (dispatch) => {
		dispatch({ type: types.ADD_TO_FAVOURITE_REQUEST });
		try {
			const { data } = await AxiosPostRequest("/pokemons/favourite/add", {
				pokemonId,
			});

			dispatch({ type: types.ADD_TO_FAVOURITE_SUCCESS, response: data });
		} catch (error) {
			if (isUnauthorized(error.response.status)) {
				// ...
			}

			dispatch({
				type: types.ADD_TO_FAVOURITE_FAILURE,
				status: error.response.data.status,
			});
		}
	};
};

export const removeFromFavourite = (pokemonId) => {
	return async (dispatch) => {
		dispatch({ type: types.REMOVE_FROM_FAVOURITE_REQUEST });
		try {
			const { data } = await AxiosPostRequest("/pokemons/favourite/remove", {
				pokemonId,
			});

			dispatch({
				type: types.REMOVE_FROM_FAVOURITE_SUCCESS,
				response: data,
			});
		} catch (error) {
			if (isUnauthorized(error.status.code)) {
				// ...
			}

			dispatch({
				type: types.REMOVE_FROM_FAVOURITE_FAILURE,
				status: error.response.data.status,
			});
		}
	};
};
