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

// Utils
import formatString from "../../utils/format-string";

// Styles
import "./card.css";

const Card = (props) => {
	const { id, name, sprite, types, stats, favouritePokemons, teamPokemons, cardType } = props;
	let cardTotal = 0;

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
		let name = formatString(type.type);

		return <span key={idx}>{name}</span>;
	});

	const displayStats = stats.map(({ name, value }, idx) => {
		cardTotal += value;

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
				<React.Fragment>
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
				</React.Fragment>
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

		case "BATTLE": {
			displayActionButtons = null;
			cardClassNames += "test";
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
				cardClassNames += "favourite";
			} else if (isTeam) {
				cardClassNames += "team";
			}

			displayActionButtons = (
				<React.Fragment>
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
				</React.Fragment>
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

			{cardType === "BATTLE" ? (
				<div className="card-total">{cardTotal}</div>
			) : (
				<React.Fragment>
					<div className="card-stats">
						<ul>{displayStats}</ul>
					</div>

					<div className="actions-controller">
						{displayActionButtons}
					</div>
				</React.Fragment>
			)}
		</article>
	);
};

export default Card;
