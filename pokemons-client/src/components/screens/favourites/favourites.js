// Dependencies
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

// Actions
import { getFavouritePokemonsRequest } from "../../../redux/actions/pokemons-actions";

// Selectors
import {
	selectFavouritePokemons,
	selectIsFetchingData,
} from "../../../redux/selectors/pokemons-selectors";

// Components
import Layout from "../../layout";
import Heading from "../../common/heading";
import SearchPanel from "../../common/search-panel/search-panel";
import Card from "../../common/card";
import Spinner from "../../common/spinner";
import NothingHere from "../../common/nothing-here";

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
		dispatch(getFavouritePokemonsRequest(sort));
	}, [dispatch, sort]);

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleSelectChange = (e) => {
		history.push(`/favourites?sort=${e.target.value.toLowerCase()}`);
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

	const listOptions = [
		{ name: "A-Z", value: "a-z" },
		{ name: "Z-A", value: "z-a" },
		{ name: "By health", value: "health" },
		{ name: "By attack", value: "attack" },
		{ name: "By defense", value: "defense" },
		{ name: "By special attack", value: "special_attack" },
		{ name: "By special defense", value: "special_defense" },
		{ name: "By speed", value: "speed" },
	];

	const cards = searchedPokemons.map((pokemon) => {
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


	let main;
	if (isFetchingData) {
		main = <Spinner />;
	} else {
		if (cards.length > 0) {
			main = <section className="cards">{cards}</section>;
		} else {
			main = (
				<NothingHere
					message="How on Earth is empty here?"
					withLink
					linkTo="/pokemons"
					linkTitle="Add favourite pokemons!"
				/>
			);
		}
	}

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
					withInput
					listOptions={listOptions}
				/>
			</Heading>

			{main}
		</Layout>
	);
};

export default Favourites;
