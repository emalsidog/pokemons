// Dependencies
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

// Actions
import { getBattlesHistory } from "../../../redux/actions/battles-actions";

// Selectors
import { selectIsLoading, selectBattlesHistory } from "../../../redux/selectors/battles-selectors";

// Styles
import "./battle-history.css";

// Components
import Layout from "../../layout";
import Heading from "../../common/heading";
import BattleContainer from "./battles-history-components/battle-container";
import Spinner from "../../common/spinner";

const BattlesHistory = () => {
	// History
	const history = useHistory();

	// Redux
	const dispatch = useDispatch();
	const battlesHistory = useSelector(selectBattlesHistory);
	const isLoading = useSelector(selectIsLoading);

	const handleSelectChange = (e) => {
		history.push(`/battles?sort=${e.target.value.toLowerCase()}`);
	}

	const values = queryString.parse(history.location.search);

	// Get battles history
	useEffect(() => {
		dispatch(getBattlesHistory(values.sort));
	}, [dispatch, values.sort]);

	const main = battlesHistory.map((battle) => {
		return <BattleContainer key={battle._id} battle={battle} />;
	});

	return (
		<Layout>
			<Heading
				title="Battles history"
				description="Just battles history."
			>
				<div className="sort-selection">
					<select onChange={handleSelectChange} defaultValue="time-descending">
						<option value="time-ascending">Time ascending</option>
						<option value="time-descending">Time descending</option>
						<option value="points-ascending">Points ascending</option>
						<option value="points-descending">Points descending</option>
					</select>
				</div>
			</Heading>
			
			{isLoading ? <Spinner /> : main}
		</Layout>
	);
};

export default BattlesHistory;
