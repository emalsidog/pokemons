// Dependencies
import { put, takeEvery, call, race, delay } from "redux-saga/effects";

// Actions
import * as actions from "../actions/battles-actions";
import { addNotification } from "../actions/notification-actions";

// Types
import * as types from "../constants/battles-constants";

// Utils
import { isUnauthorized } from "../utils/is-unauthorized";
import { AxiosGetRequest } from "../utils/server-request";

// Watcher
export function* battlesWatcher() {
	yield takeEvery(types.BATTLE_REQUEST, battle);
    yield takeEvery(types.GET_BATTLES_HISTORY_REQUEST, getBattlesHistory);
}

// BATTLE
function* battle() {
	try {
		const { data, timeout } = yield race({
			data: call(() => AxiosGetRequest("/battles/battle")),
			timeout: delay(30000),
		});

		if (data) {
            const { body: { winner, loser }, status } = data.data;

            yield put(actions.battleSuccess({ winner, loser }));
            yield put(addNotification(status));

		} else {
            const error = {
                isError: true,
                message: "Connection timeout."
            }

			yield put(actions.battleFailure());
			yield put(addNotification(error));
		}
	} catch (error) {
		isUnauthorized(error.response.status);

		yield put(actions.battleFailure());
		yield put(addNotification(error.response.data.status));
	}
}

// GET BATTLES HISTORY
function* getBattlesHistory({ sort = "time-descending" }) {
    try {
        const { data } = yield call(() => AxiosGetRequest(`/battles/battles?sort=${sort}`));
        const { body } = data;

        yield put(actions.getBattlesHistroySuccess(body.battles));
    } catch (error) {
        isUnauthorized(error.response.status);

        yield put(actions.getBattlesHistoryFailure());
        yield put(addNotification(error.response.data.status));
    }
}