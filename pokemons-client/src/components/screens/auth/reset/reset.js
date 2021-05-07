// Dependencies
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

// Actions
import { resetAction } from "../../../../redux/actions/auth-actions";

// Selectors
import {
	selectIsLoading,
	selectAuthStatus,
} from "../../../../redux/selectors/auth-selectors";

// Styles
import "../index.css";

// Antd components
import { Input, Button } from "antd";

const Reset = ({ history }) => {
	// Redux
	const isLoading = useSelector(selectIsLoading);
	const status = useSelector(selectAuthStatus);
	const dispatch = useDispatch();

	// Getting token
	const { resetToken } = useParams();

	useEffect(() => {
		if (!status.isError && status.isError !== null) {
			return history.push("/users/login");
		}
	}, [history, status.isError]);

	// Form configuration
	const {
		watch,
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const password = useRef("");
	password.current = watch("password", "");

	const handleResetSubmit = (data) => {
		data.resetToken = resetToken;
		dispatch(resetAction(data));
	};

	return (
		<div className="container">
			<form
				className="wrapper"
				onSubmit={handleSubmit(handleResetSubmit)}
			>
				<h2>Reset password</h2>
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
						<span className="error-message">
							{errors.password.message}
						</span>
					)}
				</div>
				<div className="form-group">
					<Input
						{...register("confirmPassword", {
							required: "Confirm password is a required field",
							validate: (value) =>
								value === password.current ||
								"Password do not match",
						})}
						type="password"
						placeholder="Confirm password"
					/>
					{errors.confirmPassword && (
						<span className="error-message">
							{errors.confirmPassword.message}
						</span>
					)}
				</div>
				<Button
					block
					type="primary"
					htmlType="submit"
					loading={isLoading}
				>
					{isLoading ? "Reseting..." : "Reset"}
				</Button>
			</form>
		</div>
	);
};

export default Reset;
