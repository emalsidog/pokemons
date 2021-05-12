// Dependencies
import { call, put, takeEvery } from "redux-saga/effects";

// Actions
import * as actions from "../actions/users-actions";
import { addNotification } from "../actions/notification-actions";

// Types
import * as types from "../constants/users-constants";

// Utils
import { isUnauthorized } from "../utils/is-unauthorized";
import { AxiosGetRequest } from "../utils/server-request";

// Watcher
export function* usersWatcher() {
    yield takeEvery(types.GET_USERS_REQUEST, getUsers);
}

// GET USERS
function* getUsers({ page = 1 }) {
    try {
        const { data: { body, status } } = yield call(() => AxiosGetRequest(`/users?page=${page}`));
        const { users, totalCount, limit } = body;

        const payload = {
            status, 
            data: {
                users,
                totalCount,
                limit
            }
        }
        
        yield put(actions.getUsersSuccess(payload))
    } catch (error) {
        isUnauthorized(error.response.status);

        yield put(actions.getUsersFailure());
        yield put(addNotification(error.response.data.status));
    }
}