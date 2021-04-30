// Dependencies
import React from "react";

// Styles
import "./player.css";

const Player = ({ player }) => {
	const { username, team, teamTotal } = player;

	const main = team.map((pokemon) => {
		const { id, sprite, name } = pokemon;
		return <img key={id} src={sprite} alt={name} />;
	});

	return (
		<div className="player-container">
			<div className="player-username">{username}</div>
			<div className="player-team">{main}</div>
			<div className="player-total">Team total: {teamTotal}</div>
		</div>
	);
};

export default Player;
