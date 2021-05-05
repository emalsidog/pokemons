// Constants
import * as types from "../constants/team-pokemons-constants";

// Actions
import { addNotification } from "../actions/notification-actions";

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

			const { body, status } = data;

			dispatch({ type: types.ADD_TO_TEAM_SUCCESS, body });
			dispatch(addNotification(status));
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: types.ADD_TO_TEAM_FAILURE });
			dispatch(addNotification(error.response.data.status));
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

			const { body, status } = data;

			dispatch({
				type: types.REMOVE_FROM_TEAM_SUCCESS,
				body,
			});
			dispatch(addNotification(status));
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: types.REMOVE_FROM_TEAM_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};
