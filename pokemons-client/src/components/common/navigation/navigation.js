// Dependencies
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { logoutAction } from "../../../redux/actions/auth-actions";

// Styles
import "./navigation.css";

const Navigation = () => {
	// Redux
	const dispatch = useDispatch();
	const { user } = useSelector(({ auth }) => auth);

	// History
	const history = useHistory();

	// Handle logout
	const handleLogout = () => {
		dispatch(logoutAction());
		history.push("/users/login");
	};

	return (
		<header>
			<nav>
				<ul className="nav">
					<li className="nav-item">
						<Link className="link nav-link" to="/">Home</Link>
					</li>

					<li className="dropdown nav-item">
						<span className="link nav-link">Welcome, {user.givenName} ▼</span>
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
