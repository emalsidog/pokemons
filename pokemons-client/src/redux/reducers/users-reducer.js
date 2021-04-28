// Constants
import * as types from "../constants/users-constants";

const initialState = {
	users: [],

    isLoading: false
};

const users = (state = initialState, action) => {
	switch (action.type) {

        // GET ALL USERS
        case types.GET_USERS_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case types.GET_USERS_SUCCESS: {
            return {
                ...state,
                isLaoding: false
            }
        }
        case types.GET_USERS_FAILURE: {
            return {
                ...state,
                isLaoding: false
            }
        }

		default: {
			return {
				...state,
			};
		}
	}
};

export default users;
