// Dependencies
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getTeamPokemons } from "../../../redux/actions/team-pokemons-actions";

// Selectors
import { selectUser } from "../../../redux/selectors/user-selectors";
import {
	selectTeamPokemons,
	selectIsLoading,
} from "../../../redux/selectors/pokemons-selectors";

// Components
import Layout from "../../layout";
import Heading from "../../common/heading";
import Card from "../../common/card";
import Spinner from "../../common/spinner";

const MyTeam = () => {
	// Redux
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const teamPokemons = useSelector(selectTeamPokemons);
	const isLoading = useSelector(selectIsLoading);

	useEffect(() => {
		dispatch(getTeamPokemons());
	}, [dispatch, user.teamPokemons]);

	// Render array of cards
	const main = teamPokemons.map((pokemon) => {
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

	return (
		<Layout>
			<Heading
				title="My team"
				description="Wow. Are these guys your team?"
			/>

			{isLoading ? (
				<Spinner />
			) : (
				<section className="cards">{main}</section>
			)}
		</Layout>
	);
};

export default MyTeam;
