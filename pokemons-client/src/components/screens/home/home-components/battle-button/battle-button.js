// Dependencies
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { battle } from "../../../../../redux/actions/battles-actions";

// Selectors
import { selectUser } from "../../../../../redux/selectors/user-selectors";
import { selectIsLoading } from "../../../../../redux/selectors/battles-selectors";
import { selectTeamPokemons } from "../../../../../redux/selectors/pokemons-selectors";

const BattleButton = ({ seconds = null, isMain }) => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const isLoading = useSelector(selectIsLoading);
	const teamPokemons = useSelector(selectTeamPokemons);

	const handleBattleClick = () => {
		dispatch(battle());
	};

	let text;
	if (isLoading) {
		text = `Searching for an opponent... ${isMain ? "" : seconds}`;
	} else {
		text = isMain ? "Battle!" : "Play again!";
	}

	return (
		<button
			className="btn btn-primary"
			disabled={teamPokemons.length < 5 || isLoading || !user.warParticipant}
			onClick={handleBattleClick}
		>
			{text}
		</button>
	);
};

export default BattleButton;
