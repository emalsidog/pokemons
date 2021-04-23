// Dependencies
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { logoutAction } from "../../../redux/actions/auth-actions";

// Selectors
import { selectUser } from "../../../redux/selectors/user-selectors";

// Styles
import "./navigation.css";

const Navigation = () => {
	// Redux
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	
	// History
	const history = useHistory();

	// Handle logout
	const handleLogout = () => {
		dispatch(logoutAction());
		history.push("/users/login");
	};

	return (
		<header>
			<nav className="app-container">
				<ul className="nav">
					<li className="nav-item">
						<Link className="link nav-link" to="/pokemons">List of pokemons</Link>
					</li>
					<li className="nav-item">
						<Link className="link nav-link" to="/favorites">Favorite Pokémon</Link>
					</li>
					<li className="nav-item">
						<Link className="link nav-link" to="/my-team">My team</Link>
					</li>

					<li className="dropdown nav-item">
						<span className="link nav-link">Welcome, {user.givenName} <i className="fas fa-chevron-down"></i></span>
						<div className="dropdown-content">
							<Link className="link dropdown-link" to="/settings">Settings</Link>
							<button onClick={handleLogout} className="logout-button">Logout</button>
						</div>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navigation;
