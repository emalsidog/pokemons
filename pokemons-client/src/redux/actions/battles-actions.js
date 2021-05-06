// Constants
import * as battleTypes from "../constants/battles-constants";

// Actions
import { addNotification } from "../actions/notification-actions";

// Utils
import { AxiosGetRequest } from "../utils/server-request";
import { isUnauthorized } from "../utils/is-unauthorized";

export const battle = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: battleTypes.BATTLE_REQUEST });

			const { data } = await AxiosGetRequest("/battles/battle");
			const { status, body } = data;

			dispatch({
				type: battleTypes.BATTLE_SUCCESS,
				response: {
					winner: body.winner,
					loser: body.loser,
				},
			});
			dispatch(addNotification(status));
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: battleTypes.BATTLE_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};

export const getBattlesHistory = (sort = "time-descending") => {
	return async (dispatch) => {
		try {
			dispatch({ type: battleTypes.GET_BATTLES_HISTORY_REQUEST });

			const { data } = await AxiosGetRequest(
				`/battles/battles?sort=${sort}`
			);
			const { body } = data;

			dispatch({
				type: battleTypes.GET_BATTLES_HISTORY_SUCCESS,
				response: {
					battles: body.battles,
				},
			});
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: battleTypes.GET_BATTLES_HISTORY_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};

export const clearBattleResult = () => ({
	type: battleTypes.CLEAR_BATTLE_RESULT,
});
