// Constants
import * as types from "../constants/user-constants";

const initialState = {
	user: null,
	fetchingUser: true,

	isLoading: false,
	status: {
		isError: false,
		message: "",
	},
};

const user = (state = initialState, action) => {
	switch (action.type) {
		// Set user
		// @desc - call in authReducer after successfull login
		case types.SET_USER: {
			return { ...state, user: { ...action.user } };
		}

		// Stop fetching
		// @desc - call if there is no token
		case types.STOP_FETCHING_USER: {
			return {
				...state,
				fetchingUser: false,
			};
		}

		// Get current user
		case types.GET_CURRENT_USER_REQUEST: {
			return {
				...state,
				fetchingUser: true,
				status: {
					...state.status,
				},
			};
		}
		case types.GET_CURRENT_USER_SUCCESS: {
			const { response } = action;
			return {
				...state,
				fetchingUser: false,
				isLoading: false,
				status: {
					...response.status,
				},
				user: {
					...response.body.user,
				},
			};
		}
		case types.GET_CURRENT_USER_FAILURE: {
			return {
				...state,
				fetchingUser: false,
				isLoading: false,
				status: {
					...state.status,
				},
			};
		}

		// Update name
		case types.UPDATE_NAME_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case types.UPDATE_NAME_SUCCESS: {
			const { body, status } = action.response;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					givenName: body.user.givenName,
					familyName: body.user.familyName
				},
				status: { ...status }
			};
		}
		case types.UPDATE_NAME_FAILURE: {
			const { status } = action;
			return {
				...state,
				isLoading: false,
				status: { ...status }
			};
		}

		// Update email
		case types.UPDATE_EMAIL_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case types.UPDATE_EMAIL_SUCCESS: {
			const { body, status } = action.response;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					email: body.user.email
				},
				status: { ...status }
			};
		}
		case types.UPDATE_EMAIL_FAILURE: {
			const { status } = action;
			return {
				...state,
				isLoading: false,
				status: { ...status }
			};
		}

		// Update username
		case types.UPDATE_USERNAME_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case types.UPDATE_USERNAME_SUCCESS: {
			const { body, status } = action.response;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					username: body.user.username
				},
				status: { ...status }
			};
		}
		case types.UPDATE_USERNAME_FAILURE: {
			const { status } = action;
			return {
				...state,
				isLoading: false,
				status: { ...status }
			};
		}

		// Update phone
		case types.UPDATE_PHONE_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case types.UPDATE_PHONE_SUCCESS: {
			const { body, status } = action.response;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					phone: body.user.phone
				},
				status: { ...status }
			};
		}
		case types.UPDATE_PHONE_FAILURE: {
			const { status } = action;
			return {
				...state,
				isLoading: false,
				status: { ...status }
			};
		}

		default: {
			return { ...state };
		}
	}
};

export default user;
