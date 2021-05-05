// Types
import {
	ADD_NOTIFICATION,
	REMOVE_NOTIFICATION,
} from "../constants/notification-constants";

export const addNotification = (notify) => ({
	type: ADD_NOTIFICATION,
	payload: notify,
});

export const removeNotification = (id) => ({
	type: REMOVE_NOTIFICATION,
	payload: id,
});
