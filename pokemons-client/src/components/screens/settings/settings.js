// Dependencies
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

// Actions
import { updateUserAction } from "../../../redux/actions/user-actions";

// Selectors
import {
	selectUser,
	selectStatus,
} from "../../../redux/selectors/user-selectors";

// Components
import Layout from "../../layout";
import ServerResponseNotify from "../../common/server-response-notify";

// Antd components
import { Button } from "antd";

// Styles
import "./settings.css";

const Settings = () => {
	// Redux
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const status = useSelector(selectStatus);

	// Update user form configuration
	const {
		register,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm();

	useEffect(() => {
		for (let prop in user) {
			setValue(prop, user[prop]);
		}
	}, [user, setValue]);

	const onSubmit = (data) => {
		console.log(data);
		dispatch(updateUserAction(data));
		setShowNotify(true);
	};

	// Server response notify configuration
	const [showNotify, setShowNotify] = useState(false);

	const onAnimationEnd = () => {
		setShowNotify(false);
	};

	return (
		<Layout>
			<div className="heading">
				<h1 className="title">Settings</h1>
				<span>
					Here you are able to change your personal information.
				</span>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				{/* GivenName */}
				<div className="group">
					<div className="label">Given name</div>
					<div className="input-container">
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
									message: "Name should contain only letters",
								},
							})}
							type="text"
							placeholder="Given name"
							className="input"
							disabled={status.isLoading}
						/>

						{errors.givenName && (
							<span className="validation-error-message">
								{errors.givenName.message}
							</span>
						)}
					</div>
				</div>

				{/* Family name */}
				<div className="group">
					<div className="label">Family name</div>
					<div className="input-container">
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
									message: "Name should contain only letters",
								},
							})}
							type="text"
							placeholder="Family name"
							className="input"
							disabled={status.isLoading}
						/>
						{errors.familyName && (
							<span className="validation-error-message">
								{errors.familyName.message}
							</span>
						)}
					</div>
				</div>

				{/* Email */}
				<div className="group">
					<div className="label">Email</div>
					<div className="input-container">
						<input
							{...register("email", {
								required: "Email is a required field",
								pattern: {
									value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "Email is invalid",
								},
							})}
							placeholder="Email"
							className="input"
							disabled={status.isLoading}
						/>

						{errors.email && (
							<span className="validation-error-message">
								{errors.email.message}
							</span>
						)}
					</div>
				</div>

				{/* Username */}
				<div className="group">
					<div className="label">Username</div>
					<div className="input-container">
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
							className="input"
							disabled={status.isLoading}
						/>

						{errors.username && (
							<span className="validation-error-message">
								{errors.username.message}
							</span>
						)}
					</div>
				</div>

				{/* Phone */}
				<div className="group">
					<div className="label">Phone</div>
					<div className="input-container">
						<input
							{...register("phone", {
								pattern: {
									value: /^\d+$/,
									message: "Phone number is invalid",
								},
							})}
							className="input"
							placeholder="Phone number"
							disabled={status.isLoading}
						/>

						{errors.phone && (
							<span className="validation-error-message">
								{errors.phone.message}
							</span>
						)}
					</div>
				</div>

				<div>
					<span className="label">Participate in the war?</span>
					<input
						{...register("warParticipant")}
						defaultChecked={user.warParticipant}
						disabled
						type="checkbox"
					/>
				</div>

				<Button loading={status.isLoading} htmlType="submit">
					Update
				</Button>
			</form>

			<ServerResponseNotify
				show={showNotify}
				status={{ isError: status.isError, message: status.message }}
				handleAnimationEnd={onAnimationEnd}
			/>
		</Layout>
	);
};

export default Settings;
