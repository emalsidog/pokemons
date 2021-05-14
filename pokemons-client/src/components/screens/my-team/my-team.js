// Dependencies
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getTeamPokemonsRequest } from "../../../redux/actions/pokemons-actions";

// Selectors
import {
	selectTeamPokemons,
	selectIsFetchingData,
} from "../../../redux/selectors/pokemons-selectors";

// Components
import Layout from "../../layout";
import Heading from "../../common/heading";
import Card from "../../common/card";
import Spinner from "../../common/spinner";
import NothingHere from "../../common/nothing-here";

const MyTeam = () => {
	// Redux
	const dispatch = useDispatch();
	const teamPokemons = useSelector(selectTeamPokemons);
	const isFetchingData = useSelector(selectIsFetchingData);

	useEffect(() => {
		dispatch(getTeamPokemonsRequest());
	}, [dispatch]);

	// Render array of cards
	const cards = teamPokemons.map((pokemon) => {
		const { id, sprite, name, types, stats } = pokemon;
		return (
			<Card
				key={id}
				sprite={sprite}
				id={id}
				name={name}
				types={types}
				stats={stats}
				cardType="TEAM"
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
					message="Is your team on vacation?"
					withLink
					linkTo="/pokemons"
					linkTitle="Find some pokemons!"
				/>
			);
		}
	}

	return (
		<Layout>
			<Heading
				title="My team"
				description="Wow. Are these guys your team?"
			/>

			{main}
		</Layout>
	);
};

export default MyTeam;
