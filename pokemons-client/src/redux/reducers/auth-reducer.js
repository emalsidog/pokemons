// Constants
import * as types from "../constants/auth-constants";

const initialState = {
	user: {},
	isAuthenticated: false,
	isLoading: false,
	status: {
		message: "",
		isError: null,
	},
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		// Register
		case types.REGISTER_REQUEST: {
			return {
				...state,
				isLoading: true,
				status: {
					message: "",
					isError: null,
				},
			};
		}
		case types.REGISTER_SUCCESS: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.status,
				},
			};
		}
		case types.REGISTER_FAILURE: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.status,
				},
			};
		}

		// Account activation
		case types.ACTIVATE_ACCOUNT_REQUEST: {
			return {
				...state,
				isLoading: true,
				status: {
					message: "",
					isError: null,
				},
			};
		}
		case types.ACTIVATE_ACCOUNT_SUCCESS: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.status,
				},
			};
		}
		case types.ACTIVATE_ACCOUNT_FAILURE: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.status,
				},
			};
		}

		// Login
		case types.LOGIN_REQUEST: {
			return {
				...state,
				isLoading: true,
				status: {
					message: "",
					isError: null,
				},
			};
		}
		case types.LOGIN_SUCCESS: {
			const { response } = action;
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				user: {
					...response.body.user,
				},
				status: {
					...response.status,
				},
			};
		}
		case types.LOGIN_FAILURE: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.status,
				},
			};
		}

		// Forgot password
		case types.FORGOT_PASSWORD_REQUEST: {
			return {
				...state,
				isLoading: true,
				status: {
					message: "",
					isError: null,
				},
			};
		}
		case types.FORGOT_PASSWORD_SUCCESS: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.status,
				},
			};
		}
		case types.FORGOT_PASSWORD_FAILURE: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.status,
				},
			};
		}

		// Reset password
		case types.RESET_PASSWORD_REQUEST: {
			return {
				...state,
				isLoading: true,
				status: {
					message: "",
					isError: null,
				},
			};
		}
		case types.RESET_PASSWORD_SUCCESS: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.status,
				},
			};
		}
		case types.RESET_PASSWORD_FAILURE: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.status,
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
