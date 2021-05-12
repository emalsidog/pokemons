// Dependencies
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Actions
import { updateUsernameRequest } from "../../../../../redux/actions/user-update-actions";

// Options
import { usernameOptions } from "../../../../common/options";

// Components
import ShowError from "../../../../common/show-error";

const UpdateUsernameForm = ({ username, isLoading }) => {
	const [showChangeUsernameForm, setShowChangeUsernameForm] = useState(false);

	const dispatch = useDispatch();

	const {
		register: changeUsernameRegister,
		formState: { errors: changeUsernameErrors },
		handleSubmit: changeUsernameHandleSubmit,
	} = useForm();

	const changeUsernameOnSubmit = (data) => {
		dispatch(updateUsernameRequest(data));
		setShowChangeUsernameForm(false);
	};

	const handleShowChangeUsernameForm = () => {
		setShowChangeUsernameForm(!showChangeUsernameForm);
	};

	return (
		<div className="settings-row">
			<div className="settings-row-labels">
				<div>Username</div>
			</div>

			<div className="settings-row-main">
				<span>{username}</span>
				{showChangeUsernameForm && (
					<form
						onSubmit={changeUsernameHandleSubmit(
							changeUsernameOnSubmit
						)}
					>
						<div className="form-group">
							<input
								{...changeUsernameRegister(usernameOptions.name, usernameOptions.options)}
								className="inp"
								placeholder="Username"
								disabled={isLoading}
								autoComplete="off"
							/>
							{changeUsernameErrors.username && (
								<ShowError
									message={
										changeUsernameErrors.username.message
									}
								/>
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
	);
};

export default UpdateUsernameForm;
