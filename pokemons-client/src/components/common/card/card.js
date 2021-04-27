// Dependencies
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import {
	addToFavourite,
	removeFromFavourite,
} from "../../../redux/actions/user-favouritePokemons-actions";

// Styles
import "./card.css";

const Card = (props) => {
	const {
		id,
		name,
		sprites,
		types,
		stats,
		favouritePokemons,
		cardType,
	} = props;

	const dispatch = useDispatch();

	const handleAddToFavourite = (id) => {
		dispatch(addToFavourite(id));
	};

	const handleRemoveFromFavourite = (id) => {
		dispatch(removeFromFavourite(id));
	};

	const handleAddToTeam = (id) => {
		console.log("Added: " + id);
	};

	const displayTypes = types.map((prop, idx) => {
		const { type } = prop;

		let name = formatString(type.name);

		return <span key={idx}>{name}</span>;
	});

	const displayStats = stats.map(({ stat, base_stat }, idx) => {
		let name = stat.name.replace(/-/, " ");
		name = formatString(name);

		return (
			<li key={idx}>
				<span>{name}</span>
				<span>{base_stat}</span>
			</li>
		);
	});

	let displayActionButtons;
	switch (cardType) {
		case "ALL": {
			let isFavourite = false;
			for (let pokemon of favouritePokemons) {
				if (pokemon.pokemonId === id) {
					isFavourite = true;
				}
			}

			displayActionButtons = (
				<>
					<button
						onClick={() => handleAddToTeam(id)}
						className="action-button add-team"
					>
						<i className="fas fa-plus"></i>
					</button>
					<button
						onClick={() => handleAddToFavourite(id)}
						className="action-button add-favorite"
						disabled={isFavourite}
					>
						<i className="fas fa-heart"></i>
					</button>
				</>
			);
			break;
		}
		case "FAVOURITE": {
			displayActionButtons = (
				<button
					onClick={() => handleRemoveFromFavourite(id)}
					className="action-button add-favorite"
				>
					<i className="fas fa-heart-broken"></i>
				</button>
			);
			break;
		}
		case "TEAM": {
		}
	}

	return (
		<article className="card">
			<div className="card-header">
				<img src={sprites.front_default} alt={name} />
				<h2>{name}</h2>
			</div>

			<div className="card-types">{displayTypes}</div>

			<div className="card-stats">
				<ul>{displayStats}</ul>
			</div>

			<div className="actions-controller">{displayActionButtons}</div>
		</article>
	);
};

const formatString = (string) => {
	return string[0].toUpperCase() + string.slice(1);
};

export default Card;
