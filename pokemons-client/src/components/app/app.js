// Dependencies
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getCurrentUserRequest, stopFetchingUser } from "../../redux/actions/user-update-actions";
import { getTeamPokemons, getFavouritePokemons } from "../../redux/actions/pokemons-actions";

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
import Favourites from "../screens/favourites";
import Pokemons from "../screens/pokemons";
import Users from "../screens/users";
import BattlesHistory from "../screens/battles-history";

import Spinner from "../common/spinner";
import Notification from "../common/notification";

const App = () => {
	// Redux
	const dispatch = useDispatch();
	const { fetchingUser } = useSelector(state => state.user)
	
	useEffect(() => {
		if (localStorage.getItem("accessToken")) {
			dispatch(getCurrentUserRequest());
			dispatch(getTeamPokemons());
			dispatch(getFavouritePokemons());
		} else {
			dispatch(stopFetchingUser());
		}
	}, [dispatch]);

	if (fetchingUser) {
		return <Spinner />;
	}

	return (
		<div>
			<Notification />
			<Switch>
				<Route exact path="/users/login" component={Login} />
				<Route exact path="/users/register" component={Register} />
				<Route exact path="/users/activate/:activationToken" component={Activate} />
				<Route exact path="/users/reset/:resetToken" component={Reset} />

				<ProtectedRoute exact path="/" component={Home} />
				<ProtectedRoute exact path="/settings" component={Settings} />
				<ProtectedRoute exact path="/team" component={MyTeam} />
				<ProtectedRoute exact path="/users" component={Users} />
				<ProtectedRoute exact path="/favourites" component={Favourites} />
				<ProtectedRoute exact path="/pokemons" component={Pokemons} />
				<ProtectedRoute exact path="/battles" component={BattlesHistory} />
			</Switch>
		</div>
	);
};

export default App;
