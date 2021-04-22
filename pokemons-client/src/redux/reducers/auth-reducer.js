// Constants
import * as types from "../constants/auth-constants";

const initialState = {
	isAuthenticated: false,
	
	status: {
		isLoading: false,
		message: "",
		isError: false,
	},
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		// Register
		case types.REGISTER_REQUEST: {
			return {
				...state,
				status: {
					message: "",
					isError: null,
					isLoading: true,
				},
			};
		}
		case types.REGISTER_SUCCESS: {
			return {
				...state,
				status: {
					...action.status,
					isLoading: false,
				},
			};
		}
		case types.REGISTER_FAILURE: {
			return {
				...state,
				status: {
					...action.status,
					isLoading: false,
				},
			};
		}

		// Account activation
		case types.ACTIVATE_ACCOUNT_REQUEST: {
			return {
				...state,
				status: {
					message: "",
					isError: null,
					isLoading: true,
				},
			};
		}
		case types.ACTIVATE_ACCOUNT_SUCCESS: {
			return {
				...state,
				status: {
					...action.status,
					isLoading: false,
				},
			};
		}
		case types.ACTIVATE_ACCOUNT_FAILURE: {
			return {
				...state,
				status: {
					...action.status,
					isLoading: false,
				},
			};
		}

		// Login
		case types.LOGIN_REQUEST: {
			return {
				...state,
				status: {
					message: "",
					isError: false,
					isLoading: true,
				},
			};
		}
		case types.LOGIN_SUCCESS: {
			return {
				...state,
				isAuthenticated: true,
				status: {
					...action.status,
					isLoading: false,
				},
			};
		}
		case types.LOGIN_FAILURE: {
			return {
				...state,
				status: {
					...action.status,
					isLoading: false,
				},
			};
		}

		// Forgot password
		case types.FORGOT_PASSWORD_REQUEST: {
			return {
				...state,
				status: {
					message: "",
					isError: null,
					isLoading: true,
				},
			};
		}
		case types.FORGOT_PASSWORD_SUCCESS: {
			return {
				...state,
				status: {
					...action.status,
					isLoading: false,
				},
			};
		}
		case types.FORGOT_PASSWORD_FAILURE: {
			return {
				...state,
				status: {
					...action.status,
					isLoading: false,
				},
			};
		}

		// Reset password
		case types.RESET_PASSWORD_REQUEST: {
			return {
				...state,
				status: {
					message: "",
					isError: null,
					isLoading: true,
				},
			};
		}
		case types.RESET_PASSWORD_SUCCESS: {
			return {
				...state,
				status: {
					...action.status,
					isLoading: false,
				},
			};
		}
		case types.RESET_PASSWORD_FAILURE: {
			return {
				...state,
				status: {
					...action.status,
					isLoading: false,
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
