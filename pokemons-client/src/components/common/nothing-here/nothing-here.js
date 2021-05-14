// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Styles
import "./nothing-here.css";

const NothingHere = (props) => {
	const { message, withLink = false, linkTo = null, linkTitle = null } = props;

	return (
		<div className="nothing-here">
			<h1>{message}</h1>
			{withLink && <Link to={linkTo}>{linkTitle}</Link>}
		</div>
	);
};

export default NothingHere;
