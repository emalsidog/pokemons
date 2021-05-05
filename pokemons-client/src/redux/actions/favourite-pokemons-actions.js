// Utils
import { AxiosPostRequest } from "../utils/server-request";
import { isUnauthorized } from "../utils/is-unauthorized";

// Actions
import { addNotification } from "../actions/notification-actions";

// Constants
import * as types from "../constants/favourite-pokemons-constants";

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
			if (isUnauthorized(error.response.status)) {
				// ...
			}

			dispatch({ type: types.ADD_TO_FAVOURITE_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};

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
			if (isUnauthorized(error.response.status)) {
				// ...
			}

			dispatch({ type: types.REMOVE_FROM_FAVOURITE_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};
