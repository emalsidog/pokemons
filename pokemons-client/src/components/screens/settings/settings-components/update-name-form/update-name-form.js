// Dependencies
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Actions
import { updateNameRequest } from "../../../../../redux/actions/user-update-actions";

// Options
import { givenNameOptions, familyNameOptions } from "../../../../common/options";

// Components
import ShowError from "../../../../common/show-error";

const UpdateNameForm = (props) => {
	const { givenName, familyName, isLoading } = props;

	const [showChangeNameForm, setShowChangeNameForm] = useState(false);

	const dispatch = useDispatch();

	const {
		register: changeNameRegister,
		formState: { errors: changeNameErrors },
		handleSubmit: changeNameHandleSubmit,
	} = useForm();

	const changeNameOnSubmit = (data) => {
		dispatch(updateNameRequest(data));
		setShowChangeNameForm(false);
	};

	const handleShowChangeNameForm = () => {
		setShowChangeNameForm(!showChangeNameForm);
	};

	return (
		<div className="settings-row">
			<div className="settings-row-labels">
				<div>Display name</div>
			</div>

			<div className="settings-row-main">
				<span>{`${givenName} ${familyName}`}</span>

				{showChangeNameForm && (
					<form onSubmit={changeNameHandleSubmit(changeNameOnSubmit)}>
						<div className="form-group">
							<input
								{...changeNameRegister(
									givenNameOptions.name,
									givenNameOptions.options
								)}
								className="inp"
								placeholder="Given name"
								disabled={isLoading}
								autoComplete="off"
							/>
							{changeNameErrors.givenName && (
								<ShowError
									message={changeNameErrors.givenName.message}
								/>
							)}
						</div>

						<div className="form-group">
							<input
								{...changeNameRegister(
									familyNameOptions.name,
									familyNameOptions.options
								)}
								className="inp"
								placeholder="Family name"
								disabled={isLoading}
								autoComplete="off"
							/>
							{changeNameErrors.familyName && (
								<ShowError
									message={
										changeNameErrors.familyName.message
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
					onClick={handleShowChangeNameForm}
					className="btn btn-primary"
				>
					{showChangeNameForm ? "Cancel" : "Change"}
				</button>
			</div>
		</div>
	);
};

export default UpdateNameForm;
