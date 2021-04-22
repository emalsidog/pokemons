// Constants
import * as types from "../constants/user-constants";

const initialState = {
    user: null,
    fetchingUser: true,

    status: {
        isLoading: false,
        isError: false,
        message: ""
    }
}

const user = (state = initialState, action) => {
    switch (action.type) {

        // Set user
        // @desc - call in authReducer after successfull login
        case types.SET_USER: {
            return { ...state, user: { ...action.user } }
        }

        // Stop fetching
        // @desc - call if there is no token
        case types.STOP_FETCHING_USER: {
            return {
                ...state,
                fetchingUser: false
            }
        }

        // Get current user
		case types.GET_CURRENT_USER_REQUEST: {
			return {
				...state,
                fetchingUser: true,
                status: {
                    ...state.status,
                }
			};
		}
		case types.GET_CURRENT_USER_SUCCESS: {
			const { response } = action;
			return {
				...state,
                fetchingUser: false,
				status: {
					...response.status,
                    isLoading: false
				},
				user: {
					...response.body.user
				}
			};
		}
		case types.GET_CURRENT_USER_FAILURE: {
			return {
				...state,
                fetchingUser: false,
                status: {
                    ...state.status,
                    isLoading: false
                }
			};
		}

        // Updating user
        case types.UPDATE_USER_REQUEST: {
            return { 
                ...state,
                status: {
                    isError: false,
                    message: "",
                    isLoading: true
                }
            }
        }
        case types.UPDATE_USER_SUCCESS: {
            return { 
                ...state,
                user: {
                    ...action.response.body.user
                },
                status: {
                    ...action.response.status,
                    isLoading: false
                }
            }
        }
        case types.UPDATE_USER_FAILURE: {
            return { 
                ...state,
                status: {
                    ...action.status,
                    isLoading: false
                }
            }
        }
        
        default: {
            return { ...state }
        }
    }
}

export default user;