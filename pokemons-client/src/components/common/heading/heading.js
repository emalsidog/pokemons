// Dependencies
import React from "react";

// Styles
import "./heading.css";

const Heading = (props) => {
	const { title, description, children } = props;
	return (
		<div className={`heading ${children ? "search" : ""}`}>
			<div>
				<h1 className="title">{title}</h1>
				<span>{description}</span>
			</div>
			{children}
		</div>
	);
};

export default Heading;
