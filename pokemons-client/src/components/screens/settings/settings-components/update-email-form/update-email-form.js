// Dependencies
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Actions
import { updateEmailRequest } from "../../../../../redux/actions/user-update-actions";

// Options
import { emailOptions } from "../../../../common/options";

// Components
import ShowError from "../../../../common/show-error";

const UpdateEmailForm = ({ email, isLoading }) => {

	const [showChangeEmailForm, setShowChangeEmailForm] = useState(false);

	const dispatch = useDispatch();

	const {
		register: changeEmailRegister,
		formState: { errors: changeEmailErrors },
		handleSubmit: changeEmailHandleSubmit,
	} = useForm();

	const changeEmailOnSubmit = (data) => {
		dispatch(updateEmailRequest(data));
		setShowChangeEmailForm(false);
	};

	const handleShowChangeEmailForm = () => {
		setShowChangeEmailForm(!showChangeEmailForm);
	};

	return (
		<div className="settings-row">
			<div className="settings-row-labels">
				<div>Email</div>
			</div>

			<div className="settings-row-main">
				<span>{email}</span>
				{showChangeEmailForm && (
					<form
						onSubmit={changeEmailHandleSubmit(changeEmailOnSubmit)}
					>
						<div className="form-group">
							<input
								{...changeEmailRegister(emailOptions.name, emailOptions.options)}
								className="inp"
								placeholder="Email"
								disabled={isLoading}
								autoComplete="off"
							/>

							{changeEmailErrors.email && (
								<ShowError
									message={changeEmailErrors.email.message}
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
					onClick={handleShowChangeEmailForm}
					className="btn btn-primary"
				>
					{showChangeEmailForm ? "Cancel" : "Change"}
				</button>
			</div>
		</div>
	);
};

export default UpdateEmailForm;
