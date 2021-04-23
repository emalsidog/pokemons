// Dependencies
import React from "react";

// Components
import Navigation from "../common/navigation";

const Layout = ({ children }) => {
	return (
		<div>
			<Navigation />
			<main className="app-container">{children}</main>
		</div>
	);
};

export default Layout;
