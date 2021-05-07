// Constants
import * as types from "../constants/user-update-constants";

const initialState = {
	user: null,
	fetchingUser: true,

	isLoading: false,
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
			};
		}
		case types.GET_CURRENT_USER_SUCCESS: {
			const { user } = action.body;
			return {
				...state,
				fetchingUser: false,
				isLoading: false,
				user: {
					...user,
				},
			};
		}
		case types.GET_CURRENT_USER_FAILURE: {
			return {
				...state,
				fetchingUser: false,
				isLoading: false,
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
			const { givenName, familyName } = action.body;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					givenName,
					familyName,
				},
			};
		}
		case types.UPDATE_NAME_FAILURE: {
			return {
				...state,
				isLoading: false,
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
			const { email } = action.body;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					email,
				},
			};
		}
		case types.UPDATE_EMAIL_FAILURE: {
			return {
				...state,
				isLoading: false,
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
			const { username } = action.body;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					username,
				},
			};
		}
		case types.UPDATE_USERNAME_FAILURE: {
			return {
				...state,
				isLoading: false,
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
			const { phone } = action.body;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					phone,
				},
			};
		}
		case types.UPDATE_PHONE_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}

		// Update war participant
		case types.UPDATE_WAR_PARTICIPANT_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case types.UPDATE_WAR_PARTICIPANT_SUCCESS: {
			const { warParticipant } = action.body;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					warParticipant,
				},
			};
		}
		case types.UPDATE_WAR_PARTICIPANT_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}

		default: {
			return { ...state };
		}
	}
};

export default user;
