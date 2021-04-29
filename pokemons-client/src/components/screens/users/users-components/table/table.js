// Dependencies
import React from "react";

// Styles
import "./table.css";

// Components
import TableItem from "../table-item";

const Table = (props) => {
	const { users } = props;

	const main = users.map((user) => {
		const { id, username, teamPokemons, warPoints } = user;
		return (
			<TableItem
				username={username}
				teamPokemons={teamPokemons}
				warPoints={warPoints}
				key={id}
			/>
		);
	});

	return (
		<div style={{ overflowX: "auto" }}>
			<table>
				<thead>
					<tr>
						<th>Username</th>
						<th>Deck</th>
						<th>War points</th>
					</tr>
				</thead>
				<tbody>{main}</tbody>
			</table>
		</div>
	);
};

export default Table;
