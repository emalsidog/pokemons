// Dependencies
import React from "react";

// Styles
import "./team-display.css";

// Components
import Card from "../../../../common/card";

const TeamDisplay = ({ player }) => {
	const { teamTotal, team } = player;

	const main = team.map((prop) => {
		const { id, name, sprite, stats, types } = prop;
		return (
			<Card
				key={id}
				id={id}
				name={name}
				sprite={sprite}
				stats={stats}
				types={types}
				cardType="BATTLE"
			/>
		);
	});

	return (
		<React.Fragment>
			<div className="total team-total-upper">Team total: {teamTotal}</div>
			
			<section className="cards">
				{main}
				<div className="total team-total">Team total: {teamTotal}</div>
			</section>
		</React.Fragment>
	);
};

export default TeamDisplay;
