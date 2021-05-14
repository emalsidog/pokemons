// Dependencies
const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema(
	{},
	{
		strict: false,
	}
);

module.exports = Pokemon = mongoose.model("Pokemon", PokemonSchema);
