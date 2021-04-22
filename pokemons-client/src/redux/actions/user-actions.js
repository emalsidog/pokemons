// Dependencies
import axios from "axios";

// Constants
import * as userTypes from "../constants/user-constants";

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

// POST => /update-user
export const updateUserAction = (newUserData) => {
    return async dispatch => {
        dispatch({ type: userTypes.UPDATE_USER_REQUEST });
        try {

            const { data } = await axios.post("http://localhost:4000/update-user", newUserData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            console.log(data);

            dispatch({ type: userTypes.UPDATE_USER_SUCCESS, response: data })
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.removeItem("accessToken");
            }

            const { status } = error.response.data;
            dispatch({ type: userTypes.UPDATE_USER_FAILURE, status })
        }
    }
}