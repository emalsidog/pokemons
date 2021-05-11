// Dependencies
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Actions
import { loginAction } from "../../../../../../redux/actions/auth-actions";

// Utils
import formatString from "../../../../../utils/format-string";

// Options
import { emailAndPasswordOptions } from "../../../options";

// Components
import ShowError from "../../../common/show-error";

const LoginForm = (props) => {
    const { isLoading, showModal } = props;

    const dispatch = useDispatch();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const handleLoginSubmit = (data) => {
		dispatch(loginAction(data));
	};

    const loginFields = emailAndPasswordOptions.map((prop) => {
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
		<form className="wrapper" onSubmit={handleSubmit(handleLoginSubmit)}>
			<h2>Login</h2>

			{loginFields}

			<button disabled={isLoading} className="btn btn-primary" style={{ width: "100%" }}>
				{isLoading ? "Logging you in..." : "Log in"}
			</button>

			<div style={{ marginTop: "10px" }}>
				<button	type="button" onClick={showModal} className="forgot-password-button">
					Forgot password?
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
