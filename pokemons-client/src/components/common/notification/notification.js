// Dependencies
import React from "react";
import { useSelector } from "react-redux";

// Styles
import styles from "./notification.module.css";

// Components
import Notify from "./notification-components/notify";

const Notification = () => {
	const { notifications } = useSelector((state) => state.notification);

	return (
		<div className={styles.wrapper}>
			{notifications.map((notify) => {
				return <Notify key={notify.id} {...notify} />;
			})}
		</div>
	);
};

export default Notification;
