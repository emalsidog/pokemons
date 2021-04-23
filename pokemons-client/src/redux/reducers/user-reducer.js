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

		// Updating user
		case types.UPDATE_USER_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case types.UPDATE_USER_SUCCESS: {
			return {
				...state,
				isLoading: false,
				user: {
					...action.response.body.user,
				},
				status: {
					...action.response.status,
				},
			};
		}
		case types.UPDATE_USER_FAILURE: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.status,
				},
			};
		}

		default: {
			return { ...state };
		}
	}
};

export default user;
