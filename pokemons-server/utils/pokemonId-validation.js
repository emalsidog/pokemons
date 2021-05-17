// Dependencies
const ObjectId = require("mongoose").Types.ObjectId;

const isPokemonIdValid = (pokemonId) => {
	if (!pokemonId) {
		return {
			isValid: false,
			message: "Pokemon id is not specified."
		};
	}

	if (!ObjectId.isValid(pokemonId)) {
		return {
			isValid: false,
			message: "Pokemon id is invalid."
		};
	}

	return {
		isValid: true,
		message: "Valid."
	};
}

module.exports = isPokemonIdValid;