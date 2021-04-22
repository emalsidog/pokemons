// Dependencies
import axios from "axios";

// Constants
import * as authTypes from "../constants/auth-constants";
import * as userTypes from "../constants/user-constants";

// POST => /users/register
export const registerAction = (userRegisterData) => {
	return async (dispatch) => {
		dispatch({ type: authTypes.REGISTER_REQUEST });
		try {
			const { data } = await axios.post(
				"http://localhost:4000/users/register",
				userRegisterData
			);
			dispatch({ type: authTypes.REGISTER_SUCCESS, status: data.status });
		} catch (error) {
            const { data } = error.response;
			dispatch({ type: authTypes.REGISTER_FAILURE, status: data.status });
		}
	};
};

// POST => /users/activate
export const activateAccountAction = (activationToken) => {
	return async (dispatch) => {
		dispatch({ type: authTypes.ACTIVATE_ACCOUNT_REQUEST });
		try {
			const { data } = await axios.post("http://localhost:4000/users/activate", { activationToken });
			dispatch({ type: authTypes.ACTIVATE_ACCOUNT_SUCCESS, status: data.status });
		} catch (error) {
			const { data } = error.response;
			dispatch({ type: authTypes.ACTIVATE_ACCOUNT_FAILURE, status: data.status });
		}
	};
};

// POST => /users/login
export const loginAction = (userLoginData) => {
	return async dispatch => {
		dispatch({ type: authTypes.LOGIN_REQUEST });
		try {
			const { data } = await axios.post("http://localhost:4000/users/login", userLoginData);
			localStorage.setItem("accessToken", data.body.accessToken);

			dispatch({ type: authTypes.LOGIN_SUCCESS, status: data.status });
			dispatch({ type: userTypes.SET_USER, user: data.body.user });
		} catch (error) {
			const { data } = error.response;
			dispatch({ type: authTypes.LOGIN_FAILURE, status: data.status });
		}
	}
}

// POST => /users/forgot
export const forgotAction = (email) => {
	return async dispatch => {
		dispatch({ type: authTypes.FORGOT_PASSWORD_REQUEST });
		try {
			const { data } = await axios.post("http://localhost:4000/users/forgot", email);
		dispatch({ type: authTypes.FORGOT_PASSWORD_SUCCESS, status: data.status });
		} catch (error) {
			const { data } = error.response;
			dispatch({ type: authTypes.FORGOT_PASSWORD_FAILURE, status: data.status });
		}
	}
}

// POST => /users/reset
export const resetAction = (userResetData) => {
	return async dispatch => {
		dispatch({ type: authTypes.FORGOT_PASSWORD_REQUEST });
		try {
			const { data } = await axios.post("http://localhost:4000/users/reset", userResetData);
		dispatch({ type: authTypes.FORGOT_PASSWORD_SUCCESS, status: data.status });
		} catch (error) {
			const { data } = error.response;
			dispatch({ type: authTypes.FORGOT_PASSWORD_FAILURE, status: data.status });
		}
	}
}

// Logout
export const logoutAction = () => {
	return dispatch => {
		localStorage.removeItem("accessToken");
		dispatch({ type: authTypes.LOGOUT });
	}
}