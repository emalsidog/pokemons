// Dependencies
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { getPokemonsAction } from "../../../redux/actions/pokemons-actions";

// Pagination
import Pagination from "react-js-pagination";

// Styles
import "./pokemons.css";

// Components
import Layout from "../../layout";
import Card from "../../common/card";

const Pokemons = () => {
	// Redux
	const dispatch = useDispatch();
	const { pokemons, totalCount } = useSelector((state) => state.pokemons);

	// Pagination config
	const [limit] = useState(12);
	const [page, setPage] = useState(1);

	const handlePageChange = (page) => {
		setPage(page);
	};

    // Get array of pokemons
	useEffect(() => {
		dispatch(getPokemonsAction({ offset: (page - 1) * limit, limit }));
	}, [dispatch, limit, page]);

    // Render array of cards
	const main = pokemons.map(({ data }) => {
		const { id, sprites, name, types, stats } = data;
		return (
			<Card
				key={id}
				sprites={sprites}
				id={id}
				name={name}
				types={types}
				stats={stats}
			/>
		);
	});

	return (
		<Layout>
			<div className="heading">
				<h1 className="title">Pokemons</h1>
				<p>List of all existing Pokémon</p>
			</div>

			<section className="cards">{main}</section>

			<Pagination
				hideFirstLastPages

				prevPageText={<i className="fas fa-angle-left"></i>}
				nextPageText={<i className="fas fa-angle-right"></i>}
				firstPageText={<i className="fas fa-angle-double-left"></i>}
				lastPageText={<i className="fas fa-angle-double-right"></i>}
                
				activePage={page}
				itemsCountPerPage={limit}
				totalItemsCount={totalCount}
				pageRangeDisplayed={5}
				onChange={handlePageChange}

				innerClass="innerClass"
				activeClass="activeClass"
				itemClass="itemClass"
				linkClass="linkClass"
			/>
		</Layout>
	);
};

export default Pokemons;
