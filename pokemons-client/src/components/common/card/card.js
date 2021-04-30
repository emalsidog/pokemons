// Dependencies
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import {
	addToFavourite,
	removeFromFavourite,
} from "../../../redux/actions/favourite-pokemons-actions";
import {
	addToTeam,
	removeFromTeam,
} from "../../../redux/actions/team-pokemons-actions";

// Styles
import "./card.css";

const Card = (props) => {
	const {
		id,
		name,
		sprite,
		types,
		stats,
		favouritePokemons,
		teamPokemons,
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
		dispatch(addToTeam(id));
	};

	const handleRemoveFromTeam = (id) => {
		dispatch(removeFromTeam(id));
	};
	
	const displayTypes = types.map((type, idx) => {		
		let name = formatString(type.name);

		return <span key={idx}>{name}</span>;
	});

	const displayStats = stats.map(({ name, value }, idx) => {
		let displayName = name.replace(/-/, " ");
		displayName = formatString(displayName);

		return (
			<li key={idx}>
				<span>{displayName}</span>
				<span>{value}</span>
			</li>
		);
	});

	let displayActionButtons;
	let cardClassNames = "card ";
	switch (cardType) {
		case "FAVOURITE": {
			displayActionButtons = (
				<>
					<button
						onClick={() => handleAddToTeam(id)}
						className="action-button add-team"
					>
						<i className="fas fa-plus"></i>
					</button>
					<button
						onClick={() => handleRemoveFromFavourite(id)}
						className="action-button add-favorite"
					>
						<i className="fas fa-heart-broken"></i>
					</button>
				</>
			);
			break;
		}
		case "TEAM": {
			displayActionButtons = (
				<button
					onClick={() => handleRemoveFromTeam(id)}
					className="action-button add-favorite"
				>
					<i className="fas fa-minus-square"></i>
				</button>
			);
			break;
		}
		default: {
			let isFavourite = false;
			let isTeam = false;

			for (let pokemon of favouritePokemons) {
				if (pokemon.pokemonId === id) {
					isFavourite = true;
				}
			}

			for (let pokemon of teamPokemons) {
				if (pokemon.pokemonId === id) {
					isTeam = true;
				}
			}
			
			if (isTeam && isFavourite) {
				cardClassNames += "team-favourite";
			} else if (isFavourite) {
				cardClassNames += "favourite"
			} else if (isTeam) {
				cardClassNames += "team";
			}

			displayActionButtons = (
				<>
					<button
						onClick={() => handleAddToTeam(id)}
						className="action-button add-team"
						disabled={isTeam}
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
		}
	}

	return (
		<article className={cardClassNames}>
			<div className="card-header">
				<img src={sprite} alt={name} />
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
