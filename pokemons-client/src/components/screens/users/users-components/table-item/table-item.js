// Dependencies
import React from "react";

// Styles
import "./table-item.css";

const TableItem = (props) => {
	const { username, teamPokemons, warPoints } = props;

	let main;

	if (teamPokemons.length > 0) {
		main = (
			<div className="images">
				{teamPokemons.map((pokemon) => {
					const { id, sprite } = pokemon;
					return <img key={id} src={sprite} alt="pokemon" />;
				})}
			</div>
		);
	} else {
		main = <div style={{ textAlign: "center" }}>No deck</div>;
	}

	return (
		<tr>
			<td>{username}</td>
			<td>{main}</td>
			<td>{warPoints}</td>
		</tr>
	);
};

export default TableItem;
