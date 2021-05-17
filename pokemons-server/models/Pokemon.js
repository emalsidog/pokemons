// Dependencies
const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
	abilities: [],
	base_experience: Number,
	forms: [],
	game_indices: [],
	height: Number,
	held_items: [],
	is_default: Boolean,
	location_area_encounters: String,
	moves: [],
	name: String,
	order: Number,
	past_types: [],
	species: {},
	sprites: {},
	stats: [],
	types: [],
	weight: Number,
});

module.exports = Pokemon = mongoose.model("Pokemon", PokemonSchema);
