// Dependencies
import React from "react";
import { Switch, Route } from "react-router-dom";

// Hocs
import ProtectedRoute from "../../hocs/protected-route";

// Components
import Login from "../screens/auth/login";
import Register from "../screens/auth/register";
import Activate from "../screens/auth/activate";
import Reset from "../screens/auth/reset";

import Home from "../screens/home";
import Profile from "../screens/profile";

const App = () => {
	return (
		<Switch>
			<Route exact path="/users/login" component={Login} />
			<Route exact path="/users/register" component={Register} />
			<Route exact path="/users/activate/:activationToken" component={Activate} />
			<Route exact path="/users/reset/:resetToken" component={Reset} />

			<ProtectedRoute exact path="/" component={Home} />
			<ProtectedRoute exact path="/profile" component={Profile} />
		</Switch>
	);
};

export default App;
