// Dependencies
import React from "react";

// Styles
import "./battle-container.css";

// Components
import Player from "../player";
import Header from "../header";

const BattleContainer = ({ battle }) => {
    const { winner, loser, createdAt } = battle;
	return (
		<div className="battle-container">
			<Header username={winner.username} createdAt={createdAt} />
			<div className="battle-info">
				<Player player={winner} />
				<div className="battle-vs">VS</div>
				<Player player={loser} />
			</div>
		</div>
	);
};

export default BattleContainer;
