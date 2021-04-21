// Dependencies
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Styles
import "../index.css";

// Actions
import { registerAction } from "../../../../redux/actions/auth-actions";

// Antd components
import { Input, Button } from "antd";

// Components
import ServerResponseNotify from "../../../common/server-response-notify";

const Register = ({ history }) => {
	
	// Redux
	const { status, isLoading } = useSelector(({ auth }) => auth);
	const dispatch = useDispatch();

	// Redirect if token exists
	useEffect(() => {
		if(localStorage.getItem("accessToken")) {
			return history.push("/");
		}
	});
	
	// Form configuration
	const {
		watch,
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	
	const password = useRef("");
	password.current = watch("password", "");

	const onSubmit = (data) => {
		setShowNotify(true);
		dispatch(registerAction(data));
	};
	
	// Server notify configuration
	const [showNotify, setShowNotify] = useState(false);
	
	const onAnimationEnd = () => {
		setShowNotify(false);
	};

	return (
		<>
			<div className="container">
				<form className="wrapper" onSubmit={handleSubmit(onSubmit)}>
					<h2>Register</h2>

					{/* Given name */}
					<div className="form-group">
						<Input
							{...register("givenName", {
								required: "Given name is a required field",
								minLength: {
									value: 2,
									message: "Minimal length is 2",
								},
								maxLength: {
									value: 32,
									message: "Maximal value is 32",
								},
								pattern: {
									value: /^[A-zА-я]+$/,
									message: "Name should contain only letters",
								},
							})}
							type="text"
							placeholder="Given name"
							autoFocus
						/>
						{errors.givenName && (
							<span className="validation-error-message">
								{errors.givenName.message}
							</span>
						)}
					</div>

					{/* Family name */}
					<div className="form-group">
						<Input
							{...register("familyName", {
								required: "Family name is a required field",
								minLength: {
									value: 2,
									message: "Minimal length is 2",
								},
								maxLength: {
									value: 32,
									message: "Maximal value is 32",
								},
								pattern: {
									value: /^[A-zА-я]+$/,
									message: "Name should contain only letters",
								},
							})}
							type="text"
							placeholder="Family name"
						/>
						{errors.familyName && (
							<span className="validation-error-message">
								{errors.familyName.message}
							</span>
						)}
					</div>

					{/* Email */}
					<div className="form-group">
						<Input
							{...register("email", {
								required: "Email is a required field",
								pattern: {
									value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "Email is invalid"
								}
							})}
							type="text"
							placeholder="Email"
						/>
						{errors.email && (
							<span className="validation-error-message">
								{errors.email.message}
							</span>
						)}
					</div>

					{/* Username */}
					<div className="form-group">
						<Input
							{...register("username", {
								required: "Username is a required field",
								minLength: {
									value: 2,
									message: "Minimal length is 2",
								},
								maxLength: {
									value: 32,
									message: "Maximal length is 32",
								},
								pattern: {
									value: /^[A-z0-9_]*$/,
									message:
										"Username should contain only numbers, letters and _",
								},
							})}
							type="text"
							placeholder="Username"
						/>
						{errors.username && (
							<span className="validation-error-message">
								{errors.username.message}
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

					{/* Confirm password */}
					<div className="form-group">
						<Input
							{...register("confirmPassword", {
								required:
									"Confirm password is a required field",
								validate: (value) =>
									value === password.current ||
									"Password do not match",
							})}
							type="password"
							placeholder="Confirm password"
						/>
						{errors.confirmPassword && (
							<span className="validation-error-message">
								{errors.confirmPassword.message}
							</span>
						)}
					</div>

					<Button block type="primary" htmlType="submit" loading={isLoading}>
						{ isLoading ? "Registration..." : "Register" }
					</Button>
				</form>
				<div className="wrapper wrapper-centered">
					<Link to="/users/login">Already have an account?</Link>
				</div>
			</div>
			<ServerResponseNotify
				status={status}
				show={showNotify}
				handleAnimationEnd={onAnimationEnd}
			/>
		</>
	);
};

export default Register;
