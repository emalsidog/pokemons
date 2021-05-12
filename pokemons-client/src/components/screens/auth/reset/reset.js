// Dependencies
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

// Actions
import { resetRequest } from "../../../../redux/actions/auth-actions";

// Selectors
import {
	selectIsLoading,
	selectAuthStatus,
} from "../../../../redux/selectors/auth-selectors";

// Options
import { passwordOptions } from "../../../common/options";

// Styles
import "../index.css";

// Componetns
import ShowError from "../../../common/show-error";

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
		dispatch(resetRequest(data));
	};

	return (
		<div className="container">
			<form
				className="wrapper"
				onSubmit={handleSubmit(handleResetSubmit)}
			>
				<h2>Reset password</h2>
				<div className="form-group">
					<input
						{...register(passwordOptions.name, passwordOptions.options)}
						type="password"
						className="inp"
						disabled={isLoading}
						placeholder="Password"
					/>
					{errors.password && <ShowError message={errors.password.message} />}
				</div>
				<div className="form-group">
					<input
						{...register("confirmPassword", {
							required: "Confirm password is a required field",
							validate: (value) =>
								value === password.current ||
								"Password do not match",
						})}
						className="inp"
						disabled={isLoading}
						type="password"
						placeholder="Confirm password"
					/>
					{errors.confirmPassword && <ShowError message={errors.confirmPassword.message} />}
				</div>

				<button disabled={isLoading} className="btn btn-primary" style={{ width: "100%" }}>
					{isLoading ? "Reseting..." : "Reset"}
				</button>

			</form>
		</div>
	);
};

export default Reset;
