// Dependencies
import React from "react";

// Styles
import "./main-battle-screen.css";

// Components
import BattleButton from "../battle-button";

const MainBattleScreen = (props) => {
    const { seconds, isLoading } = props;

	return (
		<div className="main-battle-screen">
			<h1>{isLoading ? `Waiting time: ${seconds}` : "Let's battle!"}</h1>
			<BattleButton isMain />
		</div>
	);
};

export default MainBattleScreen;
