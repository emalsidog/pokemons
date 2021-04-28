// Dependencies
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { getPokemonsAction } from "../../../redux/actions/pokemons-actions";

// Selectors
import {
	selectUser,
	selectStatus,
	selectIsLoading,
} from "../../../redux/selectors/user-selectors";

// Pagination
import Pagination from "react-js-pagination";

// Styles
import "./pokemons.css";

// Components
import Layout from "../../layout";
import Card from "../../common/card";
import ServerResponseNotify from "../../common/server-response-notify";
import Heading from "../../common/heading";

const Pokemons = () => {

	const [showNotify, setShowNotify] = useState(false);

	// Pagination config
	const [limit] = useState(12);
	const [page, setPage] = useState(1);

	// Redux
	const dispatch = useDispatch();
	const status = useSelector(selectStatus);
	const user = useSelector(selectUser);
	const { pokemons, totalCount } = useSelector((state) => state.pokemons);

	// Get array of pokemons
	useEffect(() => {
		dispatch(getPokemonsAction({ offset: (page - 1) * limit, limit }));
	}, [dispatch, limit, page]);

	useEffect(() => {
		if (status.message !== "") {
			setShowNotify(true);
		}
	}, [status]);

	const onAnimationEnd = () => {
		setShowNotify(false);
	};

	const handlePageChange = (page) => {
		setPage(page);
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
				favouritePokemons={user.favouritePokemons}
				teamPokemons={user.teamPokemons}
			/>
		);
	});

	return (
		<Layout>
			<Heading
				title="Pokémons"
				description="List of all existing Pokémon."
			/>

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
			
			<ServerResponseNotify
				show={showNotify}
				status={{ isError: status.isError, message: status.message }}
				handleAnimationEnd={onAnimationEnd}
			/>
		</Layout>
	);
};

export default Pokemons;
