// Constants
import * as types from "../constants/auth-constants";

const initialState = {
	isAuthenticated: false,
	isLoading: false,

	status: {
		isError: null,
		message: "",
	},
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		// Register
		case types.REGISTER_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case types.REGISTER_SUCCESS: {
			return {
				...state,
				isLoading: false,
			};
		}
		case types.REGISTER_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}

		// Account activation
		case types.ACTIVATE_ACCOUNT_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case types.ACTIVATE_ACCOUNT_SUCCESS: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.activationStatus,
				},
			};
		}
		case types.ACTIVATE_ACCOUNT_FAILURE: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.activationStatus,
				},
			};
		}

		// Login
		case types.LOGIN_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case types.LOGIN_SUCCESS: {
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
			};
		}
		case types.LOGIN_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}

		// Forgot password
		case types.FORGOT_PASSWORD_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case types.FORGOT_PASSWORD_SUCCESS: {
			return {
				...state,
				isLoading: false,
			};
		}
		case types.FORGOT_PASSWORD_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}

		// Reset password
		case types.RESET_PASSWORD_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case types.RESET_PASSWORD_SUCCESS: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.resetStatus,
				},
			};
		}
		case types.RESET_PASSWORD_FAILURE: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.resetStatus,
				},
			};
		}

		// Logout
		case types.LOGOUT: {
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};
		}

		// Default
		default: {
			return { ...state };
		}
	}
};

export default auth;
