// Constants
import * as authTypes from "../constants/auth-constants";
import * as userTypes from "../constants/user-update-constants";

// Actions
import { addNotification } from "../actions/notification-actions";

// Utils
import { AxiosPostRequest } from "../utils/server-request";

// POST => /users/register
export const registerAction = (userRegisterData) => {
	return async (dispatch) => {
		dispatch({ type: authTypes.REGISTER_REQUEST });
		try {
			const { data } = await AxiosPostRequest(
				"/users/register",
				userRegisterData
			);

			dispatch({ type: authTypes.REGISTER_SUCCESS });
			dispatch(addNotification(data.status));
		} catch (error) {
			dispatch({ type: authTypes.REGISTER_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};

// POST => /users/activate
export const activateAccountAction = (activationToken) => {
	return async (dispatch) => {
		dispatch({ type: authTypes.ACTIVATE_ACCOUNT_REQUEST });
		try {
			const { data } = await AxiosPostRequest("/users/activate", {
				activationToken,
			});

			dispatch({
				type: authTypes.ACTIVATE_ACCOUNT_SUCCESS,
				activationStatus: data.status,
			});
			dispatch(addNotification(data.status));
		} catch (error) {
			dispatch({
				type: authTypes.ACTIVATE_ACCOUNT_FAILURE,
				activationStatus: error.response.data.status,
			});
			dispatch(addNotification(error.response.data.status));
		}
	};
};

// POST => /users/login
export const loginAction = (userLoginData) => {
	return async (dispatch) => {
		dispatch({ type: authTypes.LOGIN_REQUEST });
		try {
			const { data } = await AxiosPostRequest(
				"/users/login",
				userLoginData
			);
			localStorage.setItem("accessToken", data.body.accessToken);

			dispatch({ type: authTypes.LOGIN_SUCCESS });
			dispatch({ type: userTypes.SET_USER, user: data.body.user });
		} catch (error) {
			dispatch({ type: authTypes.LOGIN_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};

// POST => /users/forgot
export const forgotAction = (email) => {
	return async (dispatch) => {
		dispatch({ type: authTypes.FORGOT_PASSWORD_REQUEST });
		try {
			const { data } = await AxiosPostRequest("/users/forgot", email);

			dispatch({ type: authTypes.FORGOT_PASSWORD_SUCCESS });
			dispatch(addNotification(data.status));
		} catch (error) {
			dispatch({ type: authTypes.FORGOT_PASSWORD_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};

// POST => /users/reset
export const resetAction = (userResetData) => {
	return async (dispatch) => {
		dispatch({ type: authTypes.RESET_PASSWORD_REQUEST });
		try {
			const { data } = await AxiosPostRequest(
				"/users/reset",
				userResetData
			);

			dispatch({
				type: authTypes.RESET_PASSWORD_SUCCESS,
				resetStatus: data.status,
			});
			dispatch(addNotification(data.status));
		} catch (error) {
			dispatch({
				type: authTypes.RESET_PASSWORD_FAILURE,
				resetStatus: error.response.data.status,
			});
			dispatch(addNotification(error.response.data.status));
		}
	};
};

// Logout
export const logoutAction = () => {
	return (dispatch) => {
		localStorage.removeItem("accessToken");
		dispatch({ type: authTypes.LOGOUT });
	};
};
