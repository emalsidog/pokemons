// Dependencies
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

// Actions
import { getCurrentUserAction } from "../../redux/actions/auth-actions";

// Hocs
import ProtectedRoute from "../../hocs/protected-route";

// Components
import Login from "../screens/auth/login";
import Register from "../screens/auth/register";
import Activate from "../screens/auth/activate";
import Reset from "../screens/auth/reset";

import Home from "../screens/home";
import Settings from "../screens/settings";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("accessToken")) {
			dispatch(getCurrentUserAction());
		}
	}, [dispatch]);

	return (
		<Switch>
			<Route exact path="/users/login" component={Login} />
			<Route exact path="/users/register" component={Register} />
			<Route exact path="/users/activate/:activationToken" component={Activate} />
			<Route exact path="/users/reset/:resetToken" component={Reset} />

			<ProtectedRoute exact path="/" component={Home} />
			<ProtectedRoute exact path="/settings" component={Settings} />
		</Switch>
	);
};

export default App;
