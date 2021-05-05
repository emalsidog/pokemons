// Dependencies
import { v4 } from "uuid";

// Types
import {
	ADD_NOTIFICATION,
	REMOVE_NOTIFICATION,
} from "../constants/notification-constants";

const initialState = {
	notifications: [],
};

const notification = (state = initialState, action) => {
	const { notifications } = state;

	switch (action.type) {
		case ADD_NOTIFICATION: {
			return {
				...state,
				notifications: [
					...notifications,
					{ id: v4(), ...action.payload },
				],
			};
		}
		case REMOVE_NOTIFICATION: {
			return {
				...state,
				notifications: notifications.filter(
					(notify) => notify.id !== action.payload
				),
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default notification;
