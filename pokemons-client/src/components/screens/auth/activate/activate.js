// Dependencies
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

// Actions
import { activateAccountAction } from "../../../../redux/actions/auth-actions";

// Selectors
import { selectAuthStatus } from "../../../../redux/selectors/auth-selectors";

// Styles
import styles from "./activate.module.css";

const Activate = () => {
	const dispatch = useDispatch();
	const status = useSelector(selectAuthStatus);
	
	const { activationToken } = useParams();

	useEffect(() => {
		dispatch(activateAccountAction(activationToken));
	}, [dispatch, activationToken]);

	const { message, isError } = status;

	return (
		<div className={styles.container}>
			<h1>{message}</h1>
			<h3>
				<Link to={isError ? "/users/register" : "/users/login"}>
					{isError ? "Back to registration page" : "To login page!"}
				</Link>
			</h3>
		</div>
	);
};

export default Activate;
