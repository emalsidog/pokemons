// Dependencies
import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	if (localStorage.getItem("accessToken")) {
		return <Route {...rest} render={(props) => <Component {...props} />} />;
	}

	return <Redirect to="/users/login" />;
};

export default ProtectedRoute;
