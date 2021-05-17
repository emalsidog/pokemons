// Dependencies
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

// Actions
import { getBattlesHistoryRequest } from "../../../redux/actions/battles-actions";

// Selectors
import {
	selectIsLoading,
	selectBattlesHistory,
} from "../../../redux/selectors/battles-selectors";

// Styles
import "./battle-history.css";

// Components
import Layout from "../../layout";
import Heading from "../../common/heading";
import BattleContainer from "./battles-history-components/battle-container";
import Spinner from "../../common/spinner";
import SearchPanel from "../../common/search-panel/search-panel";
import NothingHere from "../../common/nothing-here";

const BattlesHistory = () => {
	// History
	const history = useHistory();

	// Redux
	const dispatch = useDispatch();
	const battlesHistory = useSelector(selectBattlesHistory);
	const isLoading = useSelector(selectIsLoading);

	const handleSelectChange = (e) => {
		history.push(`/battles?sort=${e.target.value.toLowerCase()}`);
	};

	const values = queryString.parse(history.location.search);

	// Get battles history
	useEffect(() => {
		dispatch(getBattlesHistoryRequest(values.sort));
	}, [dispatch, values.sort]);

	const main = battlesHistory.map((battle) => {
		return <BattleContainer key={battle.battleId} battle={battle} />;
	});

	const listOptions = [
		{ name: "Time ascending", value: "time-ascending" },
		{ name: "Time descending", value: "time-descending" },
		{ name: "Points ascending", value: "points-ascending" },
		{ name: "Points descending", value: "points-descending" },
	];

	return (
		<Layout>
			<Heading
				title="Battles history"
				description="Just battles history."
			>
				<SearchPanel
					withInput={false}
					handleSelectChange={handleSelectChange}
					defaultValue={values.sort || "time-descending"}
					listOptions={listOptions}
				/>
			</Heading>

			{isLoading ? <Spinner /> : main.length > 0 ? main : <NothingHere message="Peace!" />}
		</Layout>
	);
};

export default BattlesHistory;
