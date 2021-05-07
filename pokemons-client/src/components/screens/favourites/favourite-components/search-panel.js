// Dependencies
import React from "react";

// Styles
import "./search-panel.css";

const SearchPanel = (props) => {
	const { searchValue, handleSearchChange, handleSelectChange, defaultValue } = props;

	return (
		<div className="search-panel">
			<input
				value={searchValue}
				onChange={handleSearchChange}
				className="inp"
				placeholder="Search by name..."
			/>
			<select onChange={handleSelectChange} defaultValue={defaultValue}>
				<option value="a-z">A-Z</option>
				<option value="z-a">Z-A</option>
				<option value="health">By health</option>
				<option value="attack">By attack</option>
				<option value="defense">By defense</option>
				<option value="special_attack">By special attack</option>
				<option value="special_defense">By special defense</option>
				<option value="speed">By speed</option>
			</select>
		</div>
	);
};

export default SearchPanel;
