// Dependencies
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Styles
import "../index.css";

// Selectors
import { selectIsLoading } from "../../../../redux/selectors/auth-selectors";

// Components
import RegisterForm from "./register-components/register-form";

const Register = ({ history }) => {
	// Redux
	const isLoading = useSelector(selectIsLoading);

	// Redirect if token exists
	useEffect(() => {
		if (localStorage.getItem("accessToken")) {
			return history.push("/");
		}
	});

	return (
		<div className="container">
			<RegisterForm isLoading={isLoading} />
			<div className="wrapper wrapper-centered">
				<Link to="/users/login">Already have an account?</Link>
			</div>
		</div>
	);
};

export default Register;
