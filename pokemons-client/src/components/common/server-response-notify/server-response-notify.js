// Dependencies
import React from "react";
import ReactDOM from "react-dom";

// Styles
import styles from "./server-response-notify.module.css";

const ServerResponseNotify = (props) => {
	const { status, show, handleAnimationEnd } = props;

	if (!show) {
		return null;
	}

	return ReactDOM.createPortal(
		<div
			onAnimationEnd={handleAnimationEnd}
			className={[
				styles.notification,
				status.isError
					? styles.notificationError
					: styles.notificationSuccess,
			].join(" ")}
		>
			<div className={styles.picture}>{status.isError ? "✖" : "✔"}</div>
			<div>{status.message}</div>
		</div>,
		document.body
	);
};

export default ServerResponseNotify;
