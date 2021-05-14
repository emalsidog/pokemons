// Dependencies
import React from "react";

// Styles
import "./search-panel.css";

const SearchPanel = (props) => {
	const {
		searchValue = undefined,
		handleSearchChange = undefined,

		handleSelectChange,
		defaultValue,

		withInput,
		listOptions,
	} = props;

	const listItems = listOptions.map(({ name, value }) => (
		<option key={value} value={value}>{name}</option>
	));

	return (
		<div className="search-panel">
			{withInput && (
				<input
					value={searchValue}
					onChange={handleSearchChange}
					className="inp"
					placeholder="Search by name..."
				/>
			)}

			<select onChange={handleSelectChange} defaultValue={defaultValue}>
				{listItems}
			</select>
		</div>
	);
};

export default SearchPanel;
