// Dependencies
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
	addToFavouriteRequest,
	removeFromFavouriteRequest,
	addToTeamRequest,
	removeFromTeamRequest,
} from "../../../redux/actions/pokemons-actions";

// Selectors
import {
	selectFavouritePokemons,
	selectTeamPokemons,
} from "../../../redux/selectors/pokemons-selectors";

// Utils
import formatString from "../../utils/format-string";

// Styles
import "./card.css";

const Card = (props) => {
	const { id, name, sprite, types, stats, cardType } = props;
	let cardTotal = 0;

	const dispatch = useDispatch();
	const favouritePokemons = useSelector(selectFavouritePokemons);
	const teamPokemons = useSelector(selectTeamPokemons);

	const handleAddToFavourite = () => {
		dispatch(addToFavouriteRequest(id));
	};

	const handleRemoveFromFavourite = () => {
		dispatch(removeFromFavouriteRequest(id));
	};

	const handleAddToTeam = () => {
		dispatch(addToTeamRequest(id));
	};

	const handleRemoveFromTeam = () => {
		dispatch(removeFromTeamRequest(id));
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
						onClick={handleAddToTeam}
						className="action-button add-team"
					>
						<i className="fas fa-plus"></i>
					</button>
					<button
						onClick={handleRemoveFromFavourite}
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
					onClick={handleRemoveFromTeam}
					className="action-button add-favorite"
				>
					<i className="fas fa-minus-square"></i>
				</button>
			);
			break;
		}

		case "BATTLE": {
			displayActionButtons = null;
			cardClassNames += "battle";
			break;
		}

		default: {
			let isFavourite = false;
			let isTeam = false;

			for (let pokemon of favouritePokemons) {
				if (pokemon.id === id) {
					isFavourite = true;
				}
			}

			for (let pokemon of teamPokemons) {
				if (pokemon.id === id) {
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
						onClick={handleAddToTeam}
						className="action-button add-team"
						disabled={isTeam}
					>
						<i className="fas fa-plus"></i>
					</button>
					<button
						onClick={handleAddToFavourite}
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
