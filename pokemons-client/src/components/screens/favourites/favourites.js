// Dependencies
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getFavouritePokemons } from "../../../redux/actions/pokemons-actions";

// Selectors
import { selectUser } from "../../../redux/selectors/user-selectors";

// Components
import Layout from "../../layout";
import Card from "../../common/card";

const Favourites = () => {

	// Redux
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const { favouritePokemons } = useSelector(state => state.pokemons);

	useEffect(() => {
		dispatch(getFavouritePokemons(user.favouritePokemons));
	}, [dispatch, user.favouritePokemons]);

	// Render array of cards
	const main = favouritePokemons.map(({ data }) => {
		const { id, sprites, name, types, stats } = data;
		return (
			<Card
				key={id}
				sprites={sprites}
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
			<div className="heading">
				<h1 className="title">Favourites</h1>
				<span>
					Oh... Your favourite pokemons are here!
				</span>
			</div>

			<section className="cards">{main}</section>
		</Layout>
	);
};

export default Favourites;
