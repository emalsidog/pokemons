// Constants
import * as userTypes from "../constants/user-update-constants";

// Actions
import { addNotification } from "../actions/notification-actions";

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
			const { body } = data;

			dispatch({
				type: userTypes.GET_CURRENT_USER_SUCCESS,
				body,
			});
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({
				type: userTypes.GET_CURRENT_USER_FAILURE,
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
			const { status, body } = data;

			dispatch({ type: userTypes.UPDATE_NAME_SUCCESS, body });
			dispatch(addNotification(status));
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: userTypes.UPDATE_NAME_FAILURE });
			dispatch(addNotification(error.response.data.status));
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
			const { status, body } = data;

			dispatch({ type: userTypes.UPDATE_EMAIL_SUCCESS, body });
			dispatch(addNotification(status));
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: userTypes.UPDATE_EMAIL_FAILURE });
			dispatch(addNotification(error.response.data.status));
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

			const { status, body } = data;

			dispatch({ type: userTypes.UPDATE_USERNAME_SUCCESS, body });
			dispatch(addNotification(status));
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: userTypes.UPDATE_USERNAME_FAILURE });
			dispatch(addNotification(error.response.data.status));
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

			const { status, body } = data;

			dispatch({ type: userTypes.UPDATE_PHONE_SUCCESS, body });
			dispatch(addNotification(status));
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: userTypes.UPDATE_PHONE_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};

export const updateWarParticipant = () => {
	return async (dispatch) => {
		dispatch({ type: userTypes.UPDATE_WAR_PARTICIPANT_REQUEST });
		try {
			const { data } = await AxiosGetRequest("/update/war-participant");

			const { status, body } = data;
			
			dispatch({
				type: userTypes.UPDATE_WAR_PARTICIPANT_SUCCESS,
				body,
			});
			dispatch(addNotification(status));
		} catch (error) {
			isUnauthorized(error.response.status);

			dispatch({ type: userTypes.UPDATE_WAR_PARTICIPANT_FAILURE });
			dispatch(addNotification(error.response.data.status));
		}
	};
};
