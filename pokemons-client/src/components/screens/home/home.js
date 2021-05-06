// Dependencies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
	clearBattleResult,
} from "../../../redux/actions/battles-actions";

// Selectors
import {
	selectBattleResult,
	selectIsLoading,
} from "../../../redux/selectors/battles-selectors";

// Styles
import "./home.css";

// Components
import Layout from "../../layout";

import TeamDisplay from "./home-components/team-display";
import BattleControllers from "./home-components/battle-controllers";
import MainBattleScreen from "./home-components/main-battle-screen";

const Home = () => {
	const [seconds, setSeconds] = useState(0);

	// Redux
	const dispatch = useDispatch();
	const battleResult = useSelector(selectBattleResult);
	const isLoading = useSelector(selectIsLoading);

	const handleBackClick = () => {
		dispatch(clearBattleResult());
	};

	// Timer
	useEffect(() => {
		const id = setInterval(() => {
			setSeconds((prev) => prev + 1);
		}, 1000);

		if (!isLoading) {
			setSeconds(0);
			return clearInterval(id);
		}

		return () => clearInterval(id);
	}, [isLoading]);

	const { winner, loser } = battleResult;

	return (
		<Layout>
			{Object.keys(battleResult).length === 0 ? (
				<MainBattleScreen seconds={seconds} isLoading={isLoading} />
			) : (
				<div className="home-container">
					<div className="home-container-heading">
						The winner is: <span>{winner.username}</span>
					</div>

					<div className="home-container-results">
						<TeamDisplay player={winner} />

						<h2 className="divider">
							{winner.username} VS {loser.username}
						</h2>

						<TeamDisplay player={loser} />
					</div>

					<BattleControllers
						isLoading={isLoading}
						seconds={seconds}
						handleBackClick={handleBackClick}
					/>
				</div>
			)}
		</Layout>
	);
};

export default Home;
