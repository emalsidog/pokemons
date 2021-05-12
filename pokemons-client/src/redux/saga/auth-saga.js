// Dependencies
import { put, call, takeEvery } from "redux-saga/effects";

// Actions
import * as actions from "../actions/auth-actions";
import { setUser } from "../actions/user-update-actions";
import { getFavouritePokemonsSuccess, getTeamPokemonsSuccess } from "../actions/pokemons-actions"
import { addNotification } from "../actions/notification-actions";

// Types
import * as authTypes from "../constants/auth-constants";

// Utils
import { AxiosPostRequest } from "../utils/server-request";

// Watcher
export function* authWatcher() {
	yield takeEvery(authTypes.REGISTER_REQUEST, register);
    yield takeEvery(authTypes.ACTIVATE_ACCOUNT_REQUEST, activate);
    yield takeEvery(authTypes.LOGIN_REQUEST, login);
    yield takeEvery(authTypes.FORGOT_PASSWORD_REQUEST, forgot);
    yield takeEvery(authTypes.RESET_PASSWORD_REQUEST, reset);
    yield takeEvery(authTypes.LOGOUT, logout);
}

// REGISTER
function* register({ userRegisterData }) {
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/users/register", userRegisterData)
		);

		yield put(actions.registerSuccess());
		yield put(addNotification(data.status));
	} catch (error) {
		yield put(actions.registerFailure());
		yield put(addNotification(error.response.data.status));
	}
}

// ACTIVATE
function* activate({ activationToken }) {
    try {
        const { data } = yield call(() => AxiosPostRequest("/users/activate", {
            activationToken
        }));
        const { status } = data;

        yield put(actions.activateSuccess(status));
        yield put(addNotification(status));
    } catch (error) {
        yield put(actions.activateFailure(error.response.data.status));
        yield put(addNotification(error.response.data.status));
    }
}

// LOGIN
function* login({ userLoginData }) {
    try {
        const { data: { body }} = yield call(() => AxiosPostRequest("/users/login", userLoginData));
        const { user, teamPokemons, favouritePokemons, accessToken } = body;

        localStorage.setItem("accessToken", accessToken);

        yield put(actions.loginSuccess());
        yield put(setUser(user));

        yield put(getFavouritePokemonsSuccess(favouritePokemons));
        yield put(getTeamPokemonsSuccess(teamPokemons));
    } catch (error) {
        yield put(actions.loginFailure());
        yield put(addNotification(error.response.data.status));
    }
}

// FORGOT
function* forgot({ email }) {
    try {
        const { data } = yield call(() => AxiosPostRequest("/users/forgot", email));

        yield put(actions.forgotSuccess());
        yield put(addNotification(data.status));
    } catch (error) {
        yield put(actions.forgotFailure());
        yield put(addNotification(error.response.data.status))
    }
}

// RESET
function* reset({ userResetData }) {
    try {
        const { data: { status } } = yield call(() => AxiosPostRequest("/users/reset", userResetData));

        yield put(actions.resetSuccess(status));
        yield put(addNotification(status))
    } catch (error) {
        yield put(actions.resetFailure(error.response.data.status));
        yield put(addNotification(error.response.data.status))
    }
}

// LOGOUT
function* logout() {
    try {
        localStorage.removeItem("accessToken");
    } catch (error) {
        const friendlyError = {
            isError: true,
            message: "Something went wrong..."
        }
        yield put(addNotification(friendlyError));
    }
}