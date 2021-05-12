// Constants
import * as userTypes from "../constants/user-update-constants";

// Stop fetching user action
export const stopFetchingUser = () => ({
	type: userTypes.STOP_FETCHING_USER,
});

// UPDATE EMAIL

export const updateEmailRequest = (data) => ({
	type: userTypes.UPDATE_EMAIL_REQUEST,
	email: data.email,
});

export const updateEmailSuccess = (body) => ({
	type: userTypes.UPDATE_EMAIL_SUCCESS,
	body,
});

export const updateEmailFailure = () => ({
	type: userTypes.UPDATE_EMAIL_FAILURE,
});

// UPDATE USERNAME

export const updateUsernameRequest = (data) => ({
	type: userTypes.UPDATE_USERNAME_REQUEST,
	username: data.username,
});

export const updateUsernameSuccess = (body) => ({
	type: userTypes.UPDATE_USERNAME_SUCCESS,
	body,
});

export const updateUsernameFailure = () => ({
	type: userTypes.UPDATE_USERNAME_FAILURE,
});

// UPDATE PHONE

export const updatePhoneRequest = (data) => ({
	type: userTypes.UPDATE_PHONE_REQUEST,
	phone: data.phone,
});

export const updatePhoneSuccess = (body) => ({
	type: userTypes.UPDATE_PHONE_SUCCESS,
	body,
});

export const updatePhoneFailure = () => ({
	type: userTypes.UPDATE_PHONE_FAILURE,
});

// UPDATE NAME

export const updateNameRequest = (data) => ({
	type: userTypes.UPDATE_NAME_REQUEST,
	name: {
		givenName: data.givenName,
		familyName: data.familyName,
	},
});

export const updateNameSuccess = (body) => ({
	type: userTypes.UPDATE_NAME_SUCCESS,
	body,
});

export const updateNameFailure = () => ({
	type: userTypes.UPDATE_NAME_FAILURE,
});

// UPDATE WAR PARTICIPANT

export const updateWarParticipantRequest = () => ({
	type: userTypes.UPDATE_WAR_PARTICIPANT_REQUEST,
});

export const updateWarParticipantSuccess = (body) => ({
	type: userTypes.UPDATE_WAR_PARTICIPANT_SUCCESS,
	body,
});

export const updateWarParticipantFailure = () => ({
	type: userTypes.UPDATE_WAR_PARTICIPANT_FAILURE,
});

// GET CURRENT USER

export const getCurrentUserRequest = () => ({
	type: userTypes.GET_CURRENT_USER_REQUEST,
});

export const getCurrentUserSuccess = (body) => ({
	type: userTypes.GET_CURRENT_USER_SUCCESS,
	body,
});

export const getCurrentUserFailure = () => ({
	type: userTypes.GET_CURRENT_USER_FAILURE,
});

// SET CURRENT USER

export const setUser = (user) => ({
	type: userTypes.SET_USER,
	user
});