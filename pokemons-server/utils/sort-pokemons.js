const sortPokemons = (pokemons, sortType) => {
	switch (sortType) {
		case "a-z": {
			return pokemons.sort((a, b) => {
				let aName = a.name.toLowerCase(),
					bName = b.name.toLowerCase();
				if (aName < bName) return -1;
				if (aName > bName) return 1;
				return 0;
			});
		}
		case "z-a": {
			return pokemons.sort((a, b) => {
				let aName = a.name.toLowerCase(),
					bName = b.name.toLowerCase();
				if (aName > bName) return -1;
				if (aName < bName) return 1;
				return 0;
			});
		}
		case "health": {
			return pokemons.sort(
				(a, b) => b.stats[0].value - a.stats[0].value
			);
		}
		case "attack": {
			return pokemons.sort(
				(a, b) => b.stats[1].value - a.stats[1].value
			);
		}
		case "defense": {
			return pokemons.sort(
				(a, b) => b.stats[2].value - a.stats[2].value
			);
		}
		case "special_attack": {
			return pokemons.sort(
				(a, b) => b.stats[3].value - a.stats[3].value
			);
		}
		case "special_defense": {
			return pokemons.sort(
				(a, b) => b.stats[4].value - a.stats[4].value
			);
		}
		case "speed": {
			return pokemons.sort(
				(a, b) => b.stats[5].value - a.stats[5].value
			);
		}
		default: {
			return pokemons;
		}
	}
};

module.exports = sortPokemons;