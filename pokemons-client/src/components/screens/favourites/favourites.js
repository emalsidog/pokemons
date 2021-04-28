// Dependencies
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getFavouritePokemons } from "../../../redux/actions/pokemons-actions";

// Selectors
import { selectUser } from "../../../redux/selectors/user-selectors";

// Styles
import "./favourites.css";

// Components
import Layout from "../../layout";
import Heading from "../../common/heading";
import Card from "../../common/card";

const Favourites = () => {
	const [searchValue, setSearchValue] = useState("");
	const [sortValue, setSortValue] = useState("A-Z");

	// Redux
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const { favouritePokemons } = useSelector((state) => state.pokemons);

	useEffect(() => {
		dispatch(getFavouritePokemons(user.favouritePokemons));
	}, [dispatch, user.favouritePokemons]);

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleSelectChange = (e) => {
		setSortValue(e.target.value);
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

	searchedPokemons = sortArray(searchedPokemons, sortValue);

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
				searchBox
				handleSelectChange={handleSelectChange}
				handleSearchChange={handleSearchChange}
				searchValue={searchValue}
			/>
			<section className="cards">{main}</section>
		</Layout>
	);
};

const sortArray = (searchedPokemons, sortValue) => {
	if (sortValue === "A-Z") {
		return searchedPokemons.sort((a, b) => {
			let aName = a.name.toLowerCase(),
				bName = b.name.toLowerCase();
			if (aName < bName) return -1;
			if (aName > bName) return 1;
			return 0;
		});
	} else if (sortValue === "Z-A") {
		return searchedPokemons.sort((a, b) => {
			let aName = a.name.toLowerCase(),
				bName = b.name.toLowerCase();
			if (aName > bName) return -1;
			if (aName < bName) return 1;
			return 0;
		});
	} else if (sortValue === "BY_HEALTH") {
		return searchedPokemons.sort(
			(a, b) => a.stats[0].value - b.stats[0].value
		);
	} else if (sortValue === "BY_ATTACK") {
		return searchedPokemons.sort(
			(a, b) => a.stats[1].value - b.stats[1].value
		);
	} else if (sortValue === "BY_DEFENSE") {
		return searchedPokemons.sort(
			(a, b) => a.stats[2].value - b.stats[2].value
		);
	} else if (sortValue === "BY_SPECIAL_ATTACK") {
		return searchedPokemons.sort(
			(a, b) => a.stats[3].value - b.stats[3].value
		);
	} else if (sortValue === "BY_SPECIAL_DEFENSE") {
		return searchedPokemons.sort(
			(a, b) => a.stats[4].value - b.stats[4].value
		);
	} else if (sortValue === "BY_SPEED") {
		return searchedPokemons.sort(
			(a, b) => a.stats[5].value - b.stats[5].value
		);
	}
};

export default Favourites;
