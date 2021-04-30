// Constants
import * as battleTypes from "../constants/battles-constants";

// Utils
import { AxiosGetRequest } from "../utils/server-request";
import { isUnauthorized } from "../utils/is-unauthorized";

export const battle = () => {
    return async dispatch => {
        try {
            dispatch({ type: battleTypes.BATTLE_REQUEST });

            const { data } = await AxiosGetRequest("/battles/battle");

            dispatch({
                type: battleTypes.BATTLE_SUCCESS,
                response: {
                    winner: data.winner,
                    loser: data.loser
                }
            })
        } catch (error) {
            if (isUnauthorized(error.response.status)) {

            }

            dispatch({
                type: battleTypes.BATTLE_FAILURE,
                status: error.response.data.status
            });
        }
    }
}

export const getBattlesHistory = () => {
    return async dispatch => {
        try {
            dispatch({ type: battleTypes.GET_BATTLES_HISTORY_REQUEST });

            const { data } = await AxiosGetRequest("/battles/battles");

            dispatch({
                type: battleTypes.GET_BATTLES_HISTORY_SUCCESS,
                response: {
                    status: data.status,
                    battles: data.body.battles
                }
            })

        } catch (error) {
            if (isUnauthorized(error.response.status)) {

            }

            dispatch({
                type: battleTypes.GET_BATTLES_HISTORY_FAILURE,
                status: error.response.data.status
            });  
        }
    }
}