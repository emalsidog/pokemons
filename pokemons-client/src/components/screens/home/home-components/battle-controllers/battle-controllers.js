// Dependencies
import React from "react";

// Styles
import "./battle-controllers.css";

// Components
import BattleButton from "../battle-button";

const BattleControllers = (props) => {
	const { isLoading, seconds, handleBackClick } = props;
	return (
		<div className="battle-controllers">
			<div>
				<BattleButton isMain={false} seconds={seconds} />
			</div>
			<div>
				<button
					disabled={isLoading}
					onClick={handleBackClick}
					className="btn btn-secondary"
				>
					Back to main menu
				</button>
			</div>
		</div>
	);
};

export default BattleControllers;
