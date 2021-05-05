// Dependencies
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";

// Actions
import { removeNotification } from "../../../../../redux/actions/notification-actions";

// Styles
import "./notify.css";

const Notify = (props) => {
	const { id, message, isError } = props;

	const dispatch = useDispatch();

	const [exit, setExit] = useState(false);
	const [width, setWidth] = useState(0);
	const [intervalID, setIntervalID] = useState(null);

	const handleStartTimer = () => {
		const id = setInterval(() => {
			setWidth((prev) => {
				if (prev < 100) {
					return prev + 0.5;
				}

				clearInterval(id);
				return prev;
			});
		}, 20);
		setIntervalID(id);
	};

	const handlePauseTimer = () => {
		clearInterval(intervalID);
	};

	const handleCloseNotification = () => {
		handlePauseTimer();
		setExit(true);
		setTimeout(() => {
			dispatch(removeNotification(id));
		}, 400);
	};

	useEffect(() => {
		handleStartTimer();
	}, []);

	useEffect(() => {
		if (width === 100) {
			handleCloseNotification();
		}
	}, [width]);

	return (
		<div
			onClick={handleCloseNotification}
			onMouseEnter={handlePauseTimer}
			onMouseLeave={handleStartTimer}
			className={`notification-item ${
				isError ? "notification-error" : "notification-success"
			} ${exit ? "exit" : ""}`}
		>
			<p>{message}</p>
			<div className="notification-bar" style={{ width: `${width}%` }} />
		</div>
	);
};

export default Notify;
