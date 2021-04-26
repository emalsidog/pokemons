// Dependencies
import React from "react";

// Components
import Navigation from "../common/navigation";

const Layout = ({ children }) => {
	return (
		<>
			<header><Navigation /></header>
			<main className="app-container">{children}</main>
		</>
	);
};

export default Layout;
