// Dependencies
import axios from "axios";

// Constants
import * as userTypes from "../constants/user-constants";
const url = "http://localhost:4000";

// Stop fetching user action
export const stopFetchingUser = () => ({
    type: userTypes.STOP_FETCHING_USER
});

// GET => /users/current-user
export const getCurrentUserAction = () => {
	return async dispatch => {
		dispatch({ type: userTypes.GET_CURRENT_USER_REQUEST });
		try {
			const { data } = await axios.get("http://localhost:4000/users/current-user", {
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("accessToken")}`
				}
			});

			dispatch({ type: userTypes.GET_CURRENT_USER_SUCCESS, response: data }) // response.status && response.body.user
		} catch (error) {
			if (error.response.status === 401) {
				localStorage.removeItem("accessToken");
			}

			const { data } = error.response;
			dispatch({ type: userTypes.GET_CURRENT_USER_FAILURE, status: data.status });
		}
	}
}

// UPDATE NAME
export const updateName = (newUserName) => {
    return async dispatch => {
        dispatch({ type: userTypes.UPDATE_NAME_REQUEST });
        try {
            const { data } = await axios.post(`${url}/update/name`, newUserName, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            dispatch({ type: userTypes.UPDATE_NAME_SUCCESS, response: data });

        } catch (error) {
            if (error.response.status === 401) {
                localStorage.removeItem("accessToken");
            }

            const { status } = error.response.data;
            dispatch({ type: userTypes.UPDATE_NAME_FAILURE, status })
        }
    }
}

// UPDATE EMAIL
export const updateEmail = (newUserEmail) => {
    return async dispatch => {
        dispatch({ type: userTypes.UPDATE_EMAIL_REQUEST });
        try {
            const { data } = await axios.post(`${url}/update/email`, newUserEmail, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            dispatch({ type: userTypes.UPDATE_EMAIL_SUCCESS, response: data });

        } catch (error) {
            if (error.response.status === 401) {
                localStorage.removeItem("accessToken");
            }

            const { status } = error.response.data;
            dispatch({ type: userTypes.UPDATE_EMAIL_FAILURE, status })
        }
    }
}

// UPDATE USERNAME
export const updateUsername = (newUserUsername) => {
    return async dispatch => {
        dispatch({ type: userTypes.UPDATE_USERNAME_REQUEST });
        try {
            const { data } = await axios.post(`${url}/update/username`, newUserUsername, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            dispatch({ type: userTypes.UPDATE_USERNAME_SUCCESS, response: data });
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.removeItem("accessToken");
            }

            const { status } = error.response.data;
            dispatch({ type: userTypes.UPDATE_USERNAME_FAILURE, status })
        }
    }
}

// UPDATE PHONE
export const updatePhone = (newUserPhone) => {
    return async dispatch => {
        dispatch({ type: userTypes.UPDATE_PHONE_REQUEST });
        try {
            const { data } = await axios.post(`${url}/update/phone`, newUserPhone, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            dispatch({ type: userTypes.UPDATE_PHONE_SUCCESS, response: data });
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.removeItem("accessToken");
            }

            const { status } = error.response.data;
            dispatch({ type: userTypes.UPDATE_PHONE_FAILURE, status })
        }
    }
}