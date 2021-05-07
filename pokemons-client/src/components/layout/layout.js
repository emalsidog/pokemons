// Dependencies
import React from "react";

// Components
import Navigation from "../common/navigation";

const Layout = ({ children }) => {
	return (
		<React.Fragment>
			<header><Navigation /></header>
			<main className="app-container">{children}</main>
		</React.Fragment>
	);
};

export default Layout;
