// Dependencies
const got = require("got");

// Utils
const randomizeTeamTotal = require("./battles-utils/randomize-team-total");

const getParsedTeam = async (teamPokemons, options) => {
	const { bodyHasUrl = false, withTotal = true } = options;

	let promises = teamPokemons.map((pokemon) => {
		if (bodyHasUrl) {
			return got(pokemon.url);
		}
		return got(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemonId}`);
	});

	const pokemonsData = await Promise.all(promises);

	let teamTotal = 0;

	const parsedTeam = pokemonsData.map(({ body }) => {
		const parsedBody = JSON.parse(body);

		// Parse stats
		const stats = parsedBody.stats.map(({ stat, base_stat }) => {
			return {
				name: stat.name,
				value: base_stat,
			};
		});

		// Parse types
		const types = parsedBody.types.map(({ type }) => ({
			type: type.name,
		}));

		// Count team total
		const result = stats.reduce((sum, current) => {
			return sum + current.value;
		}, (sum = 0));
		teamTotal += result;

		return {
			id: parsedBody.id,
			name: parsedBody.name,
			sprite: parsedBody.sprites.front_default,
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
