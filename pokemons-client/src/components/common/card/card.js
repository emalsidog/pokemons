// Dependencies
import React from "react";

// Styles
import "./card.css";

const Card = (props) => {
	const { id, name, sprites, types, stats } = props;

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

    
	return (
        <article className="card">
			<div className="card-header">
				<img src={sprites.front_default} alt={name} />
				<h2>{name}</h2>
			</div>

			<div className="card-types">
				{displayTypes}
			</div>

			<div className="card-stats">
				<ul>{displayStats}</ul>
			</div>
		</article>
	);
};

const formatString = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}

export default Card;
