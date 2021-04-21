// Dependencies
import axios from "axios";

// Constants
import * as types from "../constants/auth-constants";

// POST => /users/register
export const registerAction = (userRegisterData) => {
	return async (dispatch) => {
		dispatch({ type: types.REGISTER_REQUEST });
		try {
			const { data } = await axios.post(
				"http://localhost:4000/users/register",
				userRegisterData
			);
			dispatch({ type: types.REGISTER_SUCCESS, status: data.status });
		} catch (error) {
            const { data } = error.response;
			dispatch({ type: types.REGISTER_FAILURE, status: data.status });
		}
	};
};

// POST => /users/activate
export const activateAccountAction = (activationToken) => {
	return async (dispatch) => {
		dispatch({ type: types.ACTIVATE_ACCOUNT_REQUEST });
		try {
			const { data } = await axios.post("http://localhost:4000/users/activate", { activationToken });
			dispatch({ type: types.ACTIVATE_ACCOUNT_SUCCESS, status: data.status });
		} catch (error) {
			const { data } = error.response;
			dispatch({ type: types.ACTIVATE_ACCOUNT_FAILURE, status: data.status });
		}
	};
};

// POST => /users/login
export const loginAction = (userLoginData) => {
	return async dispatch => {
		dispatch({ type: types.LOGIN_REQUEST });
		try {
			const { data } = await axios.post("http://localhost:4000/users/login", userLoginData);
			localStorage.setItem("accessToken", data.body.accessToken);

			dispatch({ type: types.LOGIN_SUCCESS, response: data });	// response.body.accessToken && response.status
		} catch (error) {
			const { data } = error.response;
			dispatch({ type: types.LOGIN_FAILURE, status: data.status });
		}
	}
}

// POST => /users/forgot
export const forgotAction = (email) => {
	return async dispatch => {
		dispatch({ type: types.FORGOT_PASSWORD_REQUEST });
		try {
			const { data } = await axios.post("http://localhost:4000/users/forgot", email);
		dispatch({ type: types.FORGOT_PASSWORD_SUCCESS, status: data.status });
		} catch (error) {
			const { data } = error.response;
			dispatch({ type: types.FORGOT_PASSWORD_FAILURE, status: data.status });
		}
	}
}

// POST => /users/reset
export const resetAction = (userResetData) => {
	return async dispatch => {
		dispatch({ type: types.FORGOT_PASSWORD_REQUEST });
		try {
			const { data } = await axios.post("http://localhost:4000/users/reset", userResetData);
		dispatch({ type: types.FORGOT_PASSWORD_SUCCESS, status: data.status });
		} catch (error) {
			const { data } = error.response;
			dispatch({ type: types.FORGOT_PASSWORD_FAILURE, status: data.status });
		}
	}
}

// Logout
export const logoutAction = () => {
	return dispatch => {
		localStorage.removeItem("accessToken");
		dispatch({ type: types.LOGOUT });
	}
}

// GET => /users/current-user
export const getCurrentUserAction = () => {
	return async dispatch => {
		dispatch({ type: types.GET_CURRENT_USER_REQUEST });
		try {
			const { data } = await axios.get("http://localhost:4000/users/current-user", {
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("accessToken")}`
				}
			});
			dispatch({ type: types.GET_CURRENT_USER_SUCCESS, response: data }) // response.status && response.body.user
		} catch (error) {
			if (error.response.status === 401) {
				localStorage.removeItem("accessToken");
			}

			const { data } = error.response;
			dispatch({ type: types.GET_CURRENT_USER_FAILURE, status: data.status });
		}
	}
}