// Utils
const randomizeTeamTotal = require("./battles-utils/randomize-team-total");

const getParsedTeam = (teamPokemons, options) => {
	const { withTotal = true } = options;

	let teamTotal = 0;

	const parsedTeam = teamPokemons.map(pokemon => {
		
		// Parse stats
		const stats = pokemon.stats.map(({ stat, base_stat }) => {
			return {
				name: stat.name,
				value: base_stat,
			};
		});

		// Parse types
		const types = pokemon.types.map(({ type }) => ({
			type: type.name,
		}));

		// Count team total
		const result = stats.reduce((sum, current) => {
			return sum + current.value;
		}, (sum = 0));
		teamTotal += result;

		return {
			id: pokemon._id,
			name: pokemon.name,
			sprite: pokemon.sprites.front_default,
			stats,
			types,
		};
	});

	if (withTotal) {
		const randomizedTeamTotal = randomizeTeamTotal(teamTotal);
		return [parsedTeam, randomizedTeamTotal];
	}

	return parsedTeam;
};

module.exports = getParsedTeam;
