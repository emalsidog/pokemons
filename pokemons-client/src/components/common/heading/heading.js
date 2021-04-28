// Dependencies
import React from "react";

// Styles
import "./heading.css";

const Heading = (props) => {
	const {
		title,
		description,
        
		searchBox = false,
		handleSearchChange = undefined,
		handleSelectChange = undefined,
		searchValue = undefined,
	} = props;
	return (
		<div className={`heading ${searchBox ? "search" : ""}`}>
			<div>
				<h1 className="title">{title}</h1>
				<span>{description}</span>
			</div>
			{searchBox && (
				<div className="search-panel">
					<input
						value={searchValue}
						onChange={handleSearchChange}
						className="inp"
						placeholder="Search by name..."
					/>
					<select onChange={handleSelectChange} defaultValue="A-Z">
						<option value="A-Z">A-Z</option>
						<option value="Z-A">Z-A</option>
						<option value="BY_HEALTH">By health</option>
						<option value="BY_ATTACK">By attack</option>
						<option value="BY_DEFENSE">By defense</option>
						<option value="BY_SPECIAL_ATTACK">
							By special attack
						</option>
						<option value="BY_SPECIAL_DEFENSE">
							By special defense
						</option>
						<option value="BY_SPEED">By speed</option>
					</select>
				</div>
			)}
		</div>
	);
};

export default Heading;
