// Dependencies
import React from "react";
import { registerAction } from "../../../../redux/actions/auth-actions";

const Input = ({ register, name, ...rest }) => {
	return <input {...registerAction(name)} {...rest} />;
};

export default Input;
