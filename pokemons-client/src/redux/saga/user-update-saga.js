// Dependencies
import { put, call, takeEvery } from "redux-saga/effects";

// Actions
import * as actions from "../actions/user-update-actions";
import { addNotification } from "../actions/notification-actions";

// Constants
import * as types from "../constants/user-update-constants";

// Utils
import { isUnauthorized } from "../utils/is-unauthorized";
import { AxiosPostRequest, AxiosGetRequest } from "../utils/server-request";

// Watcher
export function* userUpdateWatcher() {
	yield takeEvery(types.UPDATE_EMAIL_REQUEST, updateEmail);
    yield takeEvery(types.UPDATE_USERNAME_REQUEST, updateUsername);
    yield takeEvery(types.UPDATE_PHONE_REQUEST, updatePhone);
    yield takeEvery(types.UPDATE_NAME_REQUEST, updateName);
    yield takeEvery(types.UPDATE_WAR_PARTICIPANT_REQUEST, updateWarParticipant);
    yield takeEvery(types.GET_CURRENT_USER_REQUEST, getCurrentUser);
}

// UPDATE EMAIL
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

// UPDATE USERNAME
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

// UPDATE PHONE
function* updatePhone({ phone }) {
    try {
        const { data } = yield call(() => AxiosPostRequest("/update/phone", { phone }));
        const { body, status } = data;

        yield put(actions.updatePhoneSuccess(body));
        yield put(addNotification(status));
    } catch (error) {
        isUnauthorized(error.response.status);

        yield put(actions.updatePhoneFailure());
        yield put(addNotification(error.response.data.status));
    }
}

// UPDATE NAME
function* updateName({ name }) {
    try {
        const { data } = yield call(() => AxiosPostRequest("/update/name", name));
        const { body, status } = data;

        yield put(actions.updateNameSuccess(body));
        yield put(addNotification(status));
    } catch (error) {
        isUnauthorized(error.response.status);

        yield put(actions.updateNameFailure());
        yield put(addNotification(error.response.data.status));
    }
}

// UPDATE WAR PARTICIPANT
function* updateWarParticipant() {
    try {
        const { data } = yield call(() => AxiosGetRequest("/update/war-participant"));
        const { body, status } = data;

        yield put(actions.updateWarParticipantSuccess(body));
        yield put(addNotification(status));
    } catch (error) {
        isUnauthorized(error.response.status);

        yield put(actions.updateWarParticipantFailure);
        yield put(addNotification(error.response.data.status))
    }
}

// GET CURRENT USER
function* getCurrentUser() {
    try {
        const { data } = yield call(() => AxiosGetRequest("/users/current-user"));
        const { body } = data;

        yield put(actions.getCurrentUserSuccess(body));
    } catch (error) {
        isUnauthorized(error.response.status);

        yield put(actions.getCurrentUserFailure());
    }
}