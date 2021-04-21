// Dependencies
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// Actions
import { logoutAction } from "../../../redux/actions/auth-actions";

// Antd components
import { Button } from "antd";

const Navigation = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleLogout = () => {
		dispatch(logoutAction());
		history.push("/users/login");
	};

	return (
		<header>
			<div className="ant-row">
				<div className="ant-col menu-row" style={{ flex: "1 1 auto" }}>
					<ul className="ant-menu menu-site ant-menu-root ant-menu-horizontal">
						<li className="ant-menu-item">
							<Link to="/profile">Profile</Link>
						</li>
						<li className="ant-menu-item">
							<Button onClick={handleLogout}>Logout</Button>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
};

export default Navigation;
