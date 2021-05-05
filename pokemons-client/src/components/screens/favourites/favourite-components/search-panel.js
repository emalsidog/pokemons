// Dependencies
import React from "react";

// Styles
import "./search-panel.css";

const SearchPanel = (props) => {
	const { searchValue, handleSearchChange, handleSelectChange } = props;

	return (
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
				<option value="BY_SPECIAL_ATTACK">By special attack</option>
				<option value="BY_SPECIAL_DEFENSE">By special defense</option>
				<option value="BY_SPEED">By speed</option>
			</select>
		</div>
	);
};

export default SearchPanel;
