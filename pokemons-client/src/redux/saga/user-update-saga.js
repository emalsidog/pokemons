// Dependencies
import { put, call, takeEvery } from "redux-saga/effects";

// Actions
import * as actions from "../actions/user-update-actions";
import { addNotification } from "../actions/notification-actions";

// Constants
import * as types from "../constants/user-update-constants";

// Utils
import { isUnauthorized } from "../utils/is-unauthorized";
import { AxiosPostRequest } from "../utils/server-request";

// Watcher
export function* userUpdateWatcher() {
	yield takeEvery(types.UPDATE_EMAIL_REQUEST, updateEmail);
    yield takeEvery(types.UPDATE_USERNAME_REQUEST, updateUsername);
}

// Update email
function* updateEmail({ email }) {
	try {
		const { data } = yield call(() => AxiosPostRequest("/update/email", { email }));
        const { body, status } = data;

		yield put(actions.updateEmailSuccess(body));
        yield put(addNotification(status));
	} catch (error) {
		isUnauthorized(error.response.status);
        
		yield put(actions.updateEmailFailure());
        yield put(addNotification(error.response.data.status));
	}
}

// Update username
function* updateUsername({ username }) {
    try {
        const { data } = yield call(() => AxiosPostRequest("/update/username", { username }));
        const { body, status } = data;

        yield put(actions.updateUsernameSuccess(body));
        yield put(addNotification(status));
    } catch (error) {
        console.log(error);
        isUnauthorized(error.response.status);

        yield put(actions.updateUsernameFailure());
        yield put(addNotification(error.response.data.status));
    }
}

