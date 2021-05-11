// Dependencies
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

// Actions
import {
	updateEmailRequest,
	updateUsernameRequest,
	updatePhoneRequest,
	updateNameRequest,
	updateWarParticipantRequest,
} from "../../../redux/actions/user-update-actions";

// Selectors
import {
	selectUser,
	selectIsLoading,
} from "../../../redux/selectors/user-selectors";

import { selectTeamPokemons } from "../../../redux/selectors/pokemons-selectors";

// Components
import Layout from "../../layout";
import Heading from "../../common/heading";
import ShowError from "../auth/common/show-error";

// Styles
import "./settings.css";

const Settings = () => {
	const [showChangeEmailForm, setShowChangeEmailForm] = useState(false);
	const [showChangeUsernameForm, setShowChangeUsernameForm] = useState(false);
	const [showChangePhoneForm, setShowChangePhoneForm] = useState(false);
	const [showChangeNameForm, setShowChangeNameForm] = useState(false);

	// Redux
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const isLoading = useSelector(selectIsLoading);
	const teamPokemons = useSelector(selectTeamPokemons);

	const {
		register: changeEmailRegister,
		formState: { errors: changeEmailErrors },
		handleSubmit: changeEmailHandleSubmit,
	} = useForm();

	const {
		register: changeUsernameRegister,
		formState: { errors: changeUsernameErrors },
		handleSubmit: changeUsernameHandleSubmit,
	} = useForm();

	const {
		register: changePhoneRegister,
		formState: { errors: changePhoneErrors },
		handleSubmit: changePhoneHandleSubmit,
	} = useForm();

	const {
		register: changeNameRegister,
		formState: { errors: changeNameErrors },
		handleSubmit: changeNameHandleSubmit,
	} = useForm();

	const changeEmailOnSubmit = (data) => {
		dispatch(updateEmailRequest(data));
		setShowChangeEmailForm(false);
	};

	const changeUsernameOnSubmit = (data) => {
		dispatch(updateUsernameRequest(data));
		setShowChangeUsernameForm(false);
	};

	const changePhoneOnSubmit = (data) => {
		dispatch(updatePhoneRequest(data));
		setShowChangePhoneForm(false);
	};

	const changeNameOnSubmit = (data) => {
		dispatch(updateNameRequest(data));
		setShowChangeNameForm(false);
	};

	const handleShowChangeNameForm = () => {
		setShowChangeNameForm(!showChangeNameForm);
	};

	const handleShowChangeEmailForm = () => {
		setShowChangeEmailForm(!showChangeEmailForm);
	};

	const handleShowChangeUsernameForm = () => {
		setShowChangeUsernameForm(!showChangeUsernameForm);
	};

	const handleShowChangePhoneForm = () => {
		setShowChangePhoneForm(!showChangePhoneForm);
	};

	const handleWarParticipantChange = () => {
		dispatch(updateWarParticipantRequest());
	};

	return (
		<Layout>
			<Heading
				title="Settings"
				description="Here you are able to change your personal information."
			/>

			{/* =================== EMAIL =================== */}
			<div className="settings-row">
				<div className="settings-row-labels">
					<div>Email</div>
				</div>

				<div className="settings-row-main">
					<span>{user.email}</span>
					{showChangeEmailForm && (
						<form
							onSubmit={changeEmailHandleSubmit(
								changeEmailOnSubmit
							)}
						>
							<div className="form-group">
								<input
									{...changeEmailRegister("email", {
										required: "Required field",
										pattern: {
											value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
											message: "Email is invalid",
										},
									})}
									className="inp"
									placeholder="Email"
									disabled={isLoading}
									autoComplete="off"
								/>

								{changeEmailErrors.email && (
									<div className="error-message">
										{changeEmailErrors.email.message}
									</div>
								)}
							</div>

							<button
								className="btn btn-primary"
								disabled={isLoading}
							>
								{isLoading ? "Loading..." : "Submit"}
							</button>
						</form>
					)}
				</div>

				<div className="settings-row-action">
					<button
						onClick={handleShowChangeEmailForm}
						className="btn btn-primary"
					>
						{showChangeEmailForm ? "Cancel" : "Change"}
					</button>
				</div>
			</div>

			{/* =================== USERNAME =================== */}
			<div className="settings-row">
				<div className="settings-row-labels">
					<div>Username</div>
				</div>

				<div className="settings-row-main">
					<span>{user.username}</span>
					{showChangeUsernameForm && (
						<form
							onSubmit={changeUsernameHandleSubmit(
								changeUsernameOnSubmit
							)}
						>
							<div className="form-group">
								<input
									{...changeUsernameRegister("username", {
										required: "Required field",
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
												"Should contain only numbers, letters and _",
										},
									})}
									className="inp"
									placeholder="Username"
									disabled={isLoading}
									autoComplete="off"
								/>
								{changeUsernameErrors.username && (
									<span className="error-message">
										{changeUsernameErrors.username.message}
									</span>
								)}
							</div>
							<button
								className="btn btn-primary"
								disabled={isLoading}
							>
								{isLoading ? "Loading..." : "Submit"}
							</button>
						</form>
					)}
				</div>

				<div className="settings-row-action">
					<button
						onClick={handleShowChangeUsernameForm}
						className="btn btn-primary"
					>
						{showChangeUsernameForm ? "Cancel" : "Change"}
					</button>
				</div>
			</div>

			{/* =================== PHONE =================== */}
			<div className="settings-row">
				<div className="settings-row-labels">
					<div>Phone</div>
				</div>

				<div className="settings-row-main">
					<span>{user.phone ? user.phone : "Not specified"}</span>
					{showChangePhoneForm && (
						<form
							onSubmit={changePhoneHandleSubmit(
								changePhoneOnSubmit
							)}
						>
							<div className="form-group">
								<input
									{...changePhoneRegister("phone", {
										required: "Required field",
										pattern: {
											value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
											message: "Phone is invalid",
										},
									})}
									className="inp"
									placeholder="Phone"
									disabled={isLoading}
									autoComplete="off"
								/>
								{changePhoneErrors.phone && (
									<div className="error-message">
										{changePhoneErrors.phone.message}
									</div>
								)}
							</div>
							<button
								className="btn btn-primary"
								disabled={isLoading}
							>
								{isLoading ? "Loading..." : "Submit"}
							</button>
						</form>
					)}
				</div>

				<div className="settings-row-action">
					<button
						className="btn btn-primary"
						onClick={handleShowChangePhoneForm}
					>
						{showChangePhoneForm ? "Cancel" : "Change"}
					</button>
				</div>
			</div>

			{/* =================== Name =================== */}

			<div className="settings-row">
				<div className="settings-row-labels">
					<div>Display name</div>
				</div>

				<div className="settings-row-main">
					<span>{`${user.givenName} ${user.familyName}`}</span>
					{showChangeNameForm && (
						<form
							onSubmit={changeNameHandleSubmit(
								changeNameOnSubmit
							)}
						>
							<div className="form-group">
								<input
									{...changeNameRegister("givenName", {
										required: "Required field",
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
												"Should contain only letters",
										},
									})}
									className="inp"
									placeholder="Given name"
									disabled={isLoading}
									autoComplete="off"
								/>
								{changeNameErrors.givenName && (
									<div className="error-message">
										{changeNameErrors.givenName.message}
									</div>
								)}
							</div>

							<div className="form-group">
								<input
									{...changeNameRegister("familyName", {
										required: "Required field",
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
												"Should contain only letters",
										},
									})}
									className="inp"
									placeholder="Family name"
									disabled={isLoading}
									autoComplete="off"
								/>
								{changeNameErrors.familyName && (
									<div className="error-message">
										{changeNameErrors.familyName.message}
									</div>
								)}
							</div>
							<button
								className="btn btn-primary"
								disabled={isLoading}
							>
								{isLoading ? "Loading..." : "Submit"}
							</button>
						</form>
					)}
				</div>

				<div className="settings-row-action">
					<button
						onClick={handleShowChangeNameForm}
						className="btn btn-primary"
					>
						{showChangeNameForm ? "Cancel" : "Change"}
					</button>
				</div>
			</div>

			<div className="settings-row">
				<div>Participate in the war?</div>
				<div>
					<input
						onChange={handleWarParticipantChange}
						type="checkbox"
						disabled={teamPokemons.length < 5}
						defaultChecked={user.warParticipant}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default Settings;
