// Dependencies
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getBattlesHistory } from "../../../redux/actions/battles-actions";

// Styles
import "./battle-history.css";

// Components
import Layout from "../../layout";
import Heading from "../../common/heading";
import BattleContainer from "./battles-history-components/battle-container";

const BattlesHistory = () => {
	// Redux
	const dispatch = useDispatch();
	const { battlesHistory } = useSelector((state) => state.battles);

	// Get battles history
	useEffect(() => {
		dispatch(getBattlesHistory());
	}, [dispatch]);

	console.log(battlesHistory);

	const main = battlesHistory.map((battle) => {
		return <BattleContainer key={battle._id} battle={battle} />;
	});

	return (
		<Layout>
			<Heading
				title="Battles history"
				description="Just battles history."
			/>

			{main}
		</Layout>
	);
};

export default BattlesHistory;
