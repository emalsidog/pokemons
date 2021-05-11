// Dependencies
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

// Actions
import { registerAction } from "../../../../../../redux/actions/auth-actions";

// Utils
import formatString from "../../../../../utils/format-string";

// Components
import ShowError from "../../../common/show-error";

// Options
import { registerOptions } from "../../../options";

const RegisterForm = ({ isLoading }) => {
	const dispatch = useDispatch();

	const {
		watch,
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const password = useRef("");
	password.current = watch("password", "");

	const onSubmit = (data) => {
		dispatch(registerAction(data));
	};

    const registerFields = registerOptions.map((prop) => {
		const { name, type, options } = prop;
		return (
			<div key={name} className="form-group">
				<input
					{...register(name, options)}
					className="inp"
					type={type}
					placeholder={formatString(name)}
					disabled={isLoading}
					autoComplete="off"
				/>
				{errors[name] && <ShowError message={errors[name].message} />}
			</div>
		);
	});

	return (
		<form className="wrapper" onSubmit={handleSubmit(onSubmit)}>
			<h2>Register</h2>

			{registerFields}

			{/* Confirm password */}
			<div className="form-group">
				<input
					{...register("confirmPassword", {
						required: "Confirm password is a required field",
						validate: (value) =>
							value === password.current ||
							"Password do not match",
					})}
					type="password"
					placeholder="Confirm password"
					disabled={isLoading}
					className="inp"
				/>
				{errors.confirmPassword && (
					<ShowError message={errors.confirmPassword.message} />
				)}
			</div>

			<button
				className="btn btn-primary"
				style={{ width: "100%" }}
				type="submit"
				disabled={isLoading}
			>
				{isLoading ? "Registration..." : "Register"}
			</button>
		</form>
	);
};

export default RegisterForm;