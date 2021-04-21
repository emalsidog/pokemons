// Dependencies
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

// Components
import Navigation from "../../common/navigation";

// Styles
import "./settings.css";

const Settings = () => {

	// Redux
	const { user } = useSelector(({ auth }) => auth);

	// Update user configuration
	const { register, setValue, formState: { errors }, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	// Load default input values
	useEffect(() => {
		for (let prop in user) {
			setValue(prop, user[prop]);
		}
	}, [user, setValue]);

	return (
		<>
			<Navigation />
			<div className="app-container">
				<h1>Settings</h1>
				<p>Here you are able to change your personal information.</p>
				<hr />

				<form onSubmit={handleSubmit(onSubmit)}>
					<ul className="info-list">

						{/* GivenName */}
						<li>
							<div className="label">Given name: </div>
							<input
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
										message:
											"Name should contain only letters",
									},
								})}
								type="text"
								placeholder="Given name"
							/>
						</li>
						{errors.givenName && (
							<span className="validation-error-message">
								{errors.givenName.message}
							</span>
						)}

						{/* Family name */}
						<li>
							<div className="label">Family name: </div>
							<input
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
										message:
											"Name should contain only letters",
									},
								})}
								type="text"
								placeholder="Family name"
							/>
						</li>
						{errors.familyName && (
							<span className="validation-error-message">
								{errors.familyName.message}
							</span>
						)}

						{/* Email */}
						<li>
							<div className="label">Email: </div>
							<input
								{...register("email", {
									required: "Email is a required field",
									pattern: {
										value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										message: "Email is invalid",
									},
								})}
								placeholder="Email"
							/>
						</li>
						{errors.email && (
							<span className="validation-error-message">
								{errors.email.message}
							</span>
						)}

						{/* Username */}
						<li>
							<div className="label">Username: </div>
							<input
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
								placeholder="Username"
							/>
						</li>
						{errors.email && (
							<span className="validation-error-message">
								{errors.email.message}
							</span>
						)}

						{/* Phone */}
						<li>
							<div className="label">Phone: </div>
							<input placeholder="Phone"></input>
						</li>
					</ul>
					<button>Update</button>
				</form>
			</div>
		</>
	);
};

export default Settings;
