// Dependencies
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { battle } from "../../../redux/actions/battles-actions";

// Selectors
import { selectUser } from "../../../redux/selectors/user-selectors";

// Styles
import "./home.css";

// Components
import Layout from "../../layout";

const Home = () => {
	// Redux
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const { battleResult } = useSelector((state) => state.battles);

	const handleBattleClick = () => {
		dispatch(battle());
	};

	console.log(battleResult);

	return (
		<Layout>
			{Object.keys(battleResult).length === 0 ? (
				<div className="home-heading">
					<h1>Let's battle!</h1>
					<button
						className="btn"
						disabled={user.teamPokemons.length < 5}
						onClick={handleBattleClick}
					>
						Battle
					</button>
				</div>
			) : (
				<div>
					<div>
						<div>Winner</div>
						<div>{battleResult.winner.username}</div>
					</div>
					<div>
						<div>{battleResult.winner.username}</div>
						<div>

						</div>
						<div></div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Home;
