// Dependencies
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

// Actions
import { getFavouritePokemons } from "../../../redux/actions/pokemons-actions";

// Selectors
import {
	selectFavouritePokemons,
	selectIsFetchingData,
} from "../../../redux/selectors/pokemons-selectors";

// Components
import Layout from "../../layout";
import Heading from "../../common/heading";
import SearchPanel from "./favourite-components/search-panel";
import Card from "../../common/card";
import Spinner from "../../common/spinner";

const Favourites = () => {
	const [searchValue, setSearchValue] = useState("");

	// History
	const history = useHistory();

	// Redux
	const dispatch = useDispatch();
	const favouritePokemons = useSelector(selectFavouritePokemons);
	const isFetchingData = useSelector(selectIsFetchingData);

	const values = queryString.parse(history.location.search);
	const { sort } = values;

	useEffect(() => {
		dispatch(getFavouritePokemons(sort));
	}, [dispatch, sort]);

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleSelectChange = (e) => {
		history.push({
			search: `?sort=${e.target.value}`,
		});
	};

	// Render array of cards
	let searchedPokemons = [];
	if (searchValue.length > 0) {
		searchedPokemons = favouritePokemons.filter((pokemon) => {
			return (
				pokemon.name.toLowerCase().indexOf(searchValue.toLowerCase()) >
				-1
			);
		});
	} else {
		searchedPokemons = favouritePokemons;
	}

	const main = searchedPokemons.map((pokemon) => {
		const { id, sprite, name, types, stats } = pokemon;
		return (
			<Card
				key={id}
				sprite={sprite}
				id={id}
				name={name}
				types={types}
				stats={stats}
				cardType="FAVOURITE"
			/>
		);
	});

	return (
		<Layout>
			<Heading
				title="Favourites"
				description="Oh... Your favourite pokemons are here!"
			>
				<SearchPanel
					handleSearchChange={handleSearchChange}
					handleSelectChange={handleSelectChange}
					searchValue={searchValue}
					defaultValue={sort}
				/>
			</Heading>
			
			{isFetchingData ? (
				<Spinner />
			) : (
				<section className="cards">{main}</section>
			)}
		</Layout>
	);
};

export default Favourites;
