// Constants
import * as userTypes from "../constants/user-update-constants";

// Utils
import { AxiosPostRequest, AxiosGetRequest } from "../utils/server-request";
import { isUnauthorized } from "../utils/is-unauthorized";

// Stop fetching user action
export const stopFetchingUser = () => ({
	type: userTypes.STOP_FETCHING_USER,
});

// GET => /users/current-user
export const getCurrentUserAction = () => {
	return async (dispatch) => {
		dispatch({ type: userTypes.GET_CURRENT_USER_REQUEST });
		try {
			const { data } = await AxiosGetRequest("/users/current-user");
			dispatch({
				type: userTypes.GET_CURRENT_USER_SUCCESS,
				response: data,
			});
		} catch (error) {
			if (isUnauthorized(error.response.status)) {
				// Dispatch here redirect action
			}

			dispatch({
				type: userTypes.GET_CURRENT_USER_FAILURE,
				status: error.response.data.status,
			});
		}
	};
};

// UPDATE NAME
export const updateName = (newUserName) => {
	return async (dispatch) => {
		dispatch({ type: userTypes.UPDATE_NAME_REQUEST });
		try {
			const { data } = await AxiosPostRequest(
				"/update/name",
				newUserName
			);
			dispatch({ type: userTypes.UPDATE_NAME_SUCCESS, response: data });
		} catch (error) {
			if (isUnauthorized(error.response.status)) {
				// Dispatch here redirect action
			}

			dispatch({
				type: userTypes.UPDATE_NAME_FAILURE,
				status: error.response.data.status,
			});
		}
	};
};

// UPDATE EMAIL
export const updateEmail = (newUserEmail) => {
	return async (dispatch) => {
		dispatch({ type: userTypes.UPDATE_EMAIL_REQUEST });
		try {
			const { data } = await AxiosPostRequest(
				"/update/email",
				newUserEmail
			);
			dispatch({ type: userTypes.UPDATE_EMAIL_SUCCESS, response: data });
		} catch (error) {
			if (isUnauthorized(error.response.status)) {
				// ...
			}

			dispatch({
				type: userTypes.UPDATE_EMAIL_FAILURE,
				status: error.response.data.status,
			});
		}
	};
};

// UPDATE USERNAME
export const updateUsername = (newUserUsername) => {
	return async (dispatch) => {
		dispatch({ type: userTypes.UPDATE_USERNAME_REQUEST });
		try {
			const { data } = await AxiosPostRequest(
				"/update/username",
				newUserUsername
			);
			dispatch({
				type: userTypes.UPDATE_USERNAME_SUCCESS,
				response: data,
			});
		} catch (error) {
			if (isUnauthorized(error.response.status)) {
				// ...
			}

			dispatch({
				type: userTypes.UPDATE_USERNAME_FAILURE,
				status: error.response.data.status,
			});
		}
	};
};

// UPDATE PHONE
export const updatePhone = (newUserPhone) => {
	return async (dispatch) => {
		dispatch({ type: userTypes.UPDATE_PHONE_REQUEST });
		try {
			const { data } = await AxiosPostRequest(
				"/update/phone",
				newUserPhone
			);
			dispatch({ type: userTypes.UPDATE_PHONE_SUCCESS, response: data });
		} catch (error) {
			if (isUnauthorized(error.response.status)) {
				// ...
			}

			dispatch({
				type: userTypes.UPDATE_PHONE_FAILURE,
				status: error.response.data.status,
			});
		}
	};
};
