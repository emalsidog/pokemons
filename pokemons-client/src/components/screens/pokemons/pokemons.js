// Dependencies
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

// Actions
import { getPokemonsAction } from "../../../redux/actions/pokemons-actions";

// Selectors
import {
	selectPokemons,
	selectIsFetchingData,
} from "../../../redux/selectors/pokemons-selectors";

// Styles
import "./pokemons.css";

// Components
import Layout from "../../layout";
import Card from "../../common/card";
import Heading from "../../common/heading";
import PaginationProvider from "../../common/pagination";
import Spinner from "../../common/spinner";

const Pokemons = () => {
	// History
	const history = useHistory();

	// Redux
	const dispatch = useDispatch();
	const { pokemons, totalCount } = useSelector(selectPokemons);
	const isFetchingData = useSelector(selectIsFetchingData);

	// Get array of pokemons
	const values = queryString.parse(history.location.search);
	const { page, limit } = values;

	useEffect(() => {
		dispatch(getPokemonsAction({ page, limit }));
	}, [dispatch, page, limit]);

	const handlePageChange = (page) => {
		history.push(`/pokemons?page=${page}`);
	};

	// Render array of cards
	const main = pokemons.map((pokemon) => {
		const { id, sprite, name, types, stats } = pokemon;
		return (
			<Card
				key={id}
				sprite={sprite}
				id={id}
				name={name}
				types={types}
				stats={stats}
			/>
		);
	});

	return (
		<Layout>
			<Heading
				title="Pokémons"
				description="List of all existing Pokémon."
			/>

			{isFetchingData ? (
				<Spinner />
			) : (
				<React.Fragment>
					<section className="cards">{main}</section>

					<PaginationProvider
						activePage={page}
						itemsCountPerPage={+limit || 12}
						totalItemsCount={totalCount}
						onChange={handlePageChange}
					/>
				</React.Fragment>
			)}
		</Layout>
	);
};

export default Pokemons;
