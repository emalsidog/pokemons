// Dependencies
import axios from "axios";
import { put, call, takeEvery } from "redux-saga/effects";

// Actions
import * as actions from "../actions/user-update-actions";
import { addNotification } from "../actions/notification-actions";

// Constants
import * as types from "../constants/user-update-constants";

// Utils
import { isUnauthorized } from "../utils/is-unauthorized";

// Watcher
export function* userUpdateWatcher() {
	yield takeEvery(types.UPDATE_EMAIL_REQUEST, updateEmail);
}

// Update email request
function* updateEmail({ email }) {
	try {
		const { data } = yield call(() => request("/update/email", {email}));
        const { body, status } = data;

		yield put(actions.updateEmailSuccess(body));
        yield put(addNotification(status));
	} catch (error) {
		isUnauthorized(error.response.status);
        
		yield put(actions.updateEmailFailure());
        yield put(addNotification(error.response.data.status));
	}
}



const request = (url, payload) => {
    console.log(payload);
	return axios.post(`http://localhost:4000${url}`, payload, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		},
	});
};
