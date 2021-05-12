// Constants
import * as authTypes from "../constants/auth-constants";

// REGISTER

export const registerRequest = (userRegisterData) => ({
	type: authTypes.REGISTER_REQUEST,
	userRegisterData,
});

export const registerSuccess = () => ({
	type: authTypes.REGISTER_SUCCESS,
});

export const registerFailure = () => ({
	type: authTypes.REGISTER_FAILURE,
});

// ACTIVATE

export const activateRequest = (activationToken) => ({
	type: authTypes.ACTIVATE_ACCOUNT_REQUEST,
	activationToken,
});

export const activateSuccess = (activationStatus) => ({
	type: authTypes.ACTIVATE_ACCOUNT_SUCCESS,
	activationStatus,
});

export const activateFailure = (activationStatus) => ({
	type: authTypes.ACTIVATE_ACCOUNT_FAILURE,
	activationStatus,
});

// LOGIN
export const loginRequest = (userLoginData) => ({
	type: authTypes.LOGIN_REQUEST,
	userLoginData,
});

export const loginSuccess = (user) => ({
	type: authTypes.LOGIN_SUCCESS,
	user,
});

export const loginFailure = () => ({
	type: authTypes.LOGIN_FAILURE,
});

// FORGOT
export const forgotRequest = (email) => ({
	type: authTypes.FORGOT_PASSWORD_REQUEST,
	email,
});

export const forgotSuccess = () => ({
	type: authTypes.FORGOT_PASSWORD_SUCCESS,
});

export const forgotFailure = () => ({
	type: authTypes.FORGOT_PASSWORD_FAILURE,
});

// RESET
export const resetRequest = (userResetData) => ({
	type: authTypes.RESET_PASSWORD_REQUEST,
	userResetData,
});

export const resetSuccess = (resetStatus) => ({
	type: authTypes.RESET_PASSWORD_SUCCESS,
	resetStatus,
});

export const resetFailure = (resetStatus) => ({
	type: authTypes.RESET_PASSWORD_FAILURE,
	resetStatus,
});

// LOGOUT

export const logoutRequest = () => ({
	type: authTypes.LOGOUT,
});
