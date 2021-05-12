// Dependencies
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Actions
import { updatePhoneRequest } from "../../../../../redux/actions/user-update-actions";

// Options
import { phoneOptions } from "../../../../common/options";

// Components
import ShowError from "../../../../common/show-error";

const UpdatePhoneForm = ({ phone, isLoading }) => {

	const [showChangePhoneForm, setShowChangePhoneForm] = useState(false);

	const dispatch = useDispatch();

	const {
		register: changePhoneRegister,
		formState: { errors: changePhoneErrors },
		handleSubmit: changePhoneHandleSubmit,
	} = useForm();

	const changePhoneOnSubmit = (data) => {
		dispatch(updatePhoneRequest(data));
		setShowChangePhoneForm(false);
	};

	const handleShowChangePhoneForm = () => {
		setShowChangePhoneForm(!showChangePhoneForm);
	};

	return (
		<div className="settings-row">
			<div className="settings-row-labels">
				<div>Phone</div>
			</div>

			<div className="settings-row-main">
				<span>{phone ? phone : "Not specified"}</span>
				{showChangePhoneForm && (
					<form
						onSubmit={changePhoneHandleSubmit(changePhoneOnSubmit)}
					>
						<div className="form-group">
							<input
								{...changePhoneRegister(phoneOptions.name, phoneOptions.options)}
								className="inp"
								placeholder="Phone"
								disabled={isLoading}
								autoComplete="off"
							/>
							{changePhoneErrors.phone && (
								<ShowError
									message={changePhoneErrors.phone.message}
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
					className="btn btn-primary"
					onClick={handleShowChangePhoneForm}
				>
					{showChangePhoneForm ? "Cancel" : "Change"}
				</button>
			</div>
		</div>
	);
};

export default UpdatePhoneForm;
