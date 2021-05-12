// Dependencies
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Styles
import "../index.css";

// Selectors
import { selectIsLoading } from "../../../../redux/selectors/auth-selectors";

// Components
import LoginForm from "./login-components/login-form";
import ForgotForm from "./login-components/forgot-form";
import Modal from "../../../common/modal";

const Login = ({ history }) => {
	// States
	const [isModalVisible, setIsModalVisible] = useState(false);

	// Redux
	const isLoading = useSelector(selectIsLoading);

	// Redirect if token exists
	useEffect(() => {
		if (localStorage.getItem("accessToken")) {
			return history.push("/");
		}
	});

	// Modal configuration
	const showModal = () => {
		setIsModalVisible(true);
	};

	const onClose = () => {
		setIsModalVisible(false);
	};

	return (
		<React.Fragment>
			<div className="container">
				<LoginForm isLoading={isLoading} showModal={showModal} />
				<div className="wrapper wrapper-centered">
					<Link to="/users/register">Do not have an account?</Link>
				</div>
			</div>

			<Modal
				title="Pokemons | Forgot password?"
				isVisible={isModalVisible}
				onClose={onClose}
				form="resetForm"
			>
				<ForgotForm
					isLoading={isLoading}
					setIsModalVisible={setIsModalVisible}
					isModalVisible={isModalVisible}
				/>
			</Modal>
		</React.Fragment>
	);
};

export default Login;
