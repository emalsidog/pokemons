// Constants
import * as types from "../constants/users-constants";

const initialState = {
	users: [],
    totalCount: 0,
	isLoading: false,
};

const users = (state = initialState, action) => {
	switch (action.type) {
		// GET ALL USERS
		case types.GET_USERS_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case types.GET_USERS_SUCCESS: {
			const { users, totalCount, limit } = action.response;
			return {
				...state,
				isLoading: false,
                totalCount,
                limit,
				users: [...users],
			};
		}
		case types.GET_USERS_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}

		default: {
			return {
				...state,
			};
		}
	}
};

export default users;
