// Dependencies
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Actions
import {
	forgotRequest,
} from "../../../../../../redux/actions/auth-actions";

// Utils
import formatString from "../../../../../utils/format-string";

// Options
import { emailOptions } from "../../../options";

// Components
import ShowError from "../../../common/show-error";

const ForgotForm = (props) => {
    const { isLoading, setIsModalVisible } = props;

    const dispatch = useDispatch();

	const {
		register: forgotRegister,
		formState: { errors: forgotErrors },
		handleSubmit: forgotHandleSubmit,
	} = useForm();

	const handleForgotSubmit = (data) => {
		dispatch(forgotRequest(data));
		setIsModalVisible(false);
	};

	return (
		<form id="resetForm" onSubmit={forgotHandleSubmit(handleForgotSubmit)}>
			<div className="form-group">
				<input
					{...forgotRegister(emailOptions.name, emailOptions.options)}
					type={emailOptions.type}
					placeholder={formatString(emailOptions.name)}
					disabled={isLoading}
					autoFocus
					className="inp"
				/>
				{forgotErrors.email && (
					<ShowError message={forgotErrors.email.message} />
				)}
			</div>
		</form>
	);
};

export default ForgotForm;