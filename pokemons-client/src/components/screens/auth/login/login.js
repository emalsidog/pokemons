// Dependencies
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Styles
import "../index.css";

// Selectors
import {
	getIsLoading,
	getAuthStatus,
} from "../../../../redux/selectors/auth-selectors";

// Actions
import {
	loginAction,
	forgotAction,
} from "../../../../redux/actions/auth-actions";

// Antd components
import { Input, Button, Modal } from "antd";

// Components
import ServerResponseNotify from "../../../common/server-response-notify";

const Login = ({ history }) => {
	// States
	const [showNotify, setShowNotify] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	// Redux
	const dispatch = useDispatch();
	const isLoading = useSelector(getIsLoading);
	const status = useSelector(getAuthStatus);

	// Redirect if token exists
	useEffect(() => {
		if (localStorage.getItem("accessToken")) {
			return history.push("/");
		}
	});

	// Show server notify
	useEffect(() => {
		if (status.isError && status.message !== "") {
			setShowNotify(true);
		}
	}, [status]);

	// Forgot form configuration
	const {
		register: forgotRegister,
		formState: { errors: forgotErrors },
		handleSubmit: forgotHandleSubmit,
	} = useForm();

	const handleForgotSubmit = (data) => {
		dispatch(forgotAction(data));
		setIsModalVisible(false);
		setShowNotify(true);
	};

	// Login form configuration
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const handleLoginSubmit = (data) => {
		dispatch(loginAction(data));
	};

	// Modal configuration
	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleModalCancel = () => {
		setIsModalVisible(false);
	};

	// Server notify configuration
	const onAnimationEnd = () => {
		setShowNotify(false);
	};

	return (
		<>
			<div className="container">
				<form
					className="wrapper"
					onSubmit={handleSubmit(handleLoginSubmit)}
				>
					<h2>Login</h2>

					{/* Email */}
					<div className="form-group">
						<Input
							{...register("email", {
								required: "Email is a required field",
								pattern: {
									value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "Email is invalid",
								},
							})}
							type="text"
							placeholder="Email"
							autoFocus
						/>
						{errors.email && (
							<span className="validation-error-message">
								{errors.email.message}
							</span>
						)}
					</div>

					{/* Password */}
					<div className="form-group">
						<Input
							{...register("password", {
								required: "Password is a required field",
								minLength: {
									value: 6,
									message: "Minimal length is 6",
								},
								maxLength: {
									value: 32,
									message: "Maximal length is 32",
								},
							})}
							type="password"
							placeholder="Password"
						/>
						{errors.password && (
							<span className="validation-error-message">
								{errors.password.message}
							</span>
						)}
					</div>

					<Button
						block
						type="primary"
						htmlType="submit"
						loading={isLoading}
					>
						{isLoading ? "Logging you in..." : "Log in"}
					</Button>

					<div style={{ marginTop: "10px" }}>
						<button
							type="button"
							onClick={showModal}
							className="forgot-password-button"
						>
							Forgot password?
						</button>
					</div>
				</form>

				<div className="wrapper wrapper-centered">
					<Link to="/users/register">Do not have an account?</Link>
				</div>
			</div>

			{/* Modal for forgot password request */}
			<Modal
				title="Pokemons | Forgot password?"
				visible={isModalVisible}
				onCancel={handleModalCancel}
				footer={[
					<Button
						key="Cancel"
						onClick={handleModalCancel}
						disabled={isLoading}
					>
						Cancel
					</Button>,
					<Button
						form="resetForm"
						htmlType="submit"
						key="Reset!"
						loading={isLoading}
					>
						Reset!
					</Button>,
				]}
			>
				<form
					id="resetForm"
					onSubmit={forgotHandleSubmit(handleForgotSubmit)}
				>
					{/* Email */}
					<div className="form-group">
						<Input
							{...forgotRegister("email", {
								required: "Email is a required field",
								pattern: {
									value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "Email is invalid",
								},
							})}
							type="text"
							placeholder="Email"
							autoFocus
						/>
						{forgotErrors.email && (
							<span className="validation-error-message">
								{forgotErrors.email.message}
							</span>
						)}
					</div>
				</form>
			</Modal>

			<ServerResponseNotify
				status={status}
				show={showNotify}
				handleAnimationEnd={onAnimationEnd}
			/>
		</>
	);
};

export default Login;
