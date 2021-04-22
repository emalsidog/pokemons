// Dependencies
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getCurrentUserAction, stopFetchingUser } from "../../redux/actions/user-actions";

// Hocs
import ProtectedRoute from "../../hocs/protected-route";

// Components
import Login from "../screens/auth/login";
import Register from "../screens/auth/register";
import Activate from "../screens/auth/activate";
import Reset from "../screens/auth/reset";

import Home from "../screens/home";
import Settings from "../screens/settings";
import MyTeam from "../screens/my-team";
import Favorites from "../screens/favorites";

import Spinner from "../common/spinner";

const App = () => {
	// Redux
	const dispatch = useDispatch();
	const { fetchingUser } = useSelector(state => state.user)
	console.log(useSelector(state => state))

	useEffect(() => {
		if (localStorage.getItem("accessToken")) {
			dispatch(getCurrentUserAction());
		} else {
			dispatch(stopFetchingUser());
		}
	}, [dispatch]);

	if (fetchingUser) {
		return <Spinner />;
	}

	return (
		<Switch>
			<Route exact path="/users/login" component={Login} />
			<Route exact path="/users/register" component={Register} />
			<Route exact path="/users/activate/:activationToken" component={Activate} />
			<Route exact path="/users/reset/:resetToken" component={Reset} />

			<ProtectedRoute exact path="/" component={Home} />
			<ProtectedRoute exact path="/settings" component={Settings} />
			<ProtectedRoute exact path="/my-team" component={MyTeam} />
			<ProtectedRoute exact path="/favorites" component={Favorites} />
		</Switch>
	);
};

export default App;
