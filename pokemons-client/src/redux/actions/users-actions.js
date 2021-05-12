// Constatns
import * as types from "../constants/users-constants";

// GET USERS

export const getUsersRequest = (page) => ({
	type: types.GET_USERS_REQUEST,
	page
});

export const getUsersSuccess = (payload) => ({
	type: types.GET_USERS_SUCCESS,
	payload
});

export const getUsersFailure = () => ({
	type: types.GET_USERS_FAILURE
});