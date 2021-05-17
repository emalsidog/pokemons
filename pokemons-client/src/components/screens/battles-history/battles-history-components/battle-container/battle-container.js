// Dependencies
import React from "react";

// Styles
import "./battle-container.css";

// Components
import Player from "../player";
import Header from "../header";

const BattleContainer = ({ battle }) => {
	const { winner, loser, result, createdAt } = battle.battle;
	const { earnedPoints } = battle;
	return (
		<div className="battle-container">
			<Header username={winner.username} result={result} createdAt={createdAt} />
			<div className="battle-info">
				<Player player={winner} />
				<div className="battle-vs">VS</div>
				<Player player={loser} />
			</div>
			<div className="battle-points-info">
				Points earned: <span>{earnedPoints}</span>
			</div>
		</div>
	);
};

export default BattleContainer;
