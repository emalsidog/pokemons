// Constants
import * as types from "../constants/pokemons-constants";

// Actions
import { addNotification } from "../actions/notification-actions";

// Utils
import { AxiosGetRequest } from "../utils/server-request";
import { isUnauthorized } from "../utils/is-unauthorized";

// GET => Pokemons
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