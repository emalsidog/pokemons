// Dependencies
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// Actions
import { logoutAction } from "../../../redux/actions/auth-actions";

// Styles
import "./navigation.css";

const Navigation = () => {
	const [toggleResponsiveNav, setToggleResponsiveNav] = useState(false);

	// Redux
	const dispatch = useDispatch();

	// History
	const history = useHistory();

	// Handle logout
	const handleLogout = () => {
		dispatch(logoutAction());
		history.push("/users/login");
	};

	// Handle navbar toggling
	const navbarToggle = () => {
		setToggleResponsiveNav(!toggleResponsiveNav);
	};

	const classNames = `nav-items ${toggleResponsiveNav ? "nav-toggle-show" : ""}`;

	return (
		<div className="nav-wrapper">
			<div className="nav app-container">
				<Link to="/" className="nav-link brand">Pokemons</Link>
				<div onClick={navbarToggle} className="nav-link toggle">
					<i className="fas fa-bars"></i>
				</div>
				<nav className={classNames}>
					<Link to="/pokemons" className="nav-link">List</Link>
					<Link to="/favourites" className="nav-link">Favourites</Link>
					<Link to="/team" className="nav-link">My team</Link>
					<Link to="/users" className="nav-link">Users</Link>
					<Link to="/settings" className="nav-link">Settings</Link>
					<div onClick={handleLogout} className="nav-link">Logout</div>
				</nav>
			</div>
		</div>
	);
};

export default Navigation;
