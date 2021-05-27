// Models
const User = require("../models/User");

// Utils
const ErrorResponse = require("../utils/error-response");
const getParsedTeam = require("../utils/get-parsed-team");
const isPokemonIdValid = require("../utils/pokemonId-validation");
const { populateUser } = require("../utils/populate-user");

// GET => /pokemons/favourite
exports.get = async (req, res, next) => {
	const { sort = "a-z" } = req.query;

	try {
		const user = await User.aggregate([
			{ $match: { _id: req.user._id } },
			{ $project: { favouritePokemons: 1 } },
			{
				$lookup: {
					from: "pokemons",
					localField: "favouritePokemons",
					foreignField: "_id",
					as: "favouritePokemons",
				},
			},
			{
				$project: {
					"favouritePokemons._id": 1,
					"favouritePokemons.name": 1,
					"favouritePokemons.stats": 1,
					"favouritePokemons.types": 1,
					"favouritePokemons.sprites": 1,
				},
			},
			{ $unwind: "$favouritePokemons" },
			{
				$sort: sortPokemons(sort.toLowerCase()),
			},
			{
				$group: {
					_id: "$_id",
					favouritePokemons: { $push: "$favouritePokemons" },
				},
			},
		]);

		if (!user) {
			return next(new ErrorResponse("Unauthorized.", 401));
		}

		const parsedTeam = getParsedTeam(user[0].favouritePokemons, {
			withTotal: false,
		});

		res.status(200).json({
			status: {
				isError: false,
				message: "Done.",
			},
			body: {
				favouritePokemons: parsedTeam,
			},
		});
	} catch (error) {
		next(error);
	}
};

// POST => /pokemons/favourite/add
exports.add = async (req, res, next) => {
	const { pokemonId } = req.body;

	const validationResult = isPokemonIdValid(pokemonId);
	if (!validationResult.isValid) {
		return next(new ErrorResponse(validationResult.message, 400));
	}

	try {
		const user = await User.findOneAndUpdate(
			{
				_id: req.user._id,
				favouritePokemons: { $ne: pokemonId },
			},
			{ $push: { favouritePokemons: pokemonId } },
			{ new: true }
		);

		const populatedUser = await populateUser(user, "favouritePokemons");
		const parsedTeam = getParsedTeam(populatedUser.favouritePokemons, {
			withTotal: false,
		});

		res.status(200).json({
			status: {
				isError: false,
				message: "Added to favourites.",
			},
			body: {
				favouritePokemons: parsedTeam,
			},
		});
	} catch (error) {
		next(error);
	}
};

// POST => /pokemons/favourite/remove
exports.remove = async (req, res, next) => {
	const { pokemonId } = req.body;

	const validationResult = isPokemonIdValid(pokemonId);
	if (!validationResult.isValid) {
		return next(new ErrorResponse(validationResult.message, 400));
	}

	try {
		const user = await User.findByIdAndUpdate(
			req.user._id,
			{
				$pull: {
					favouritePokemons: pokemonId,
				},
			},
			{
				new: true,
			}
		);

		const populatedUser = await populateUser(user, "favouritePokemons");
		const parsedTeam = getParsedTeam(populatedUser.favouritePokemons, {
			withTotal: false,
		});

		res.status(200).json({
			status: {
				isError: false,
				message: "Removed from favourites.",
			},
			body: {
				favouritePokemons: parsedTeam,
			},
		});
	} catch (error) {
		next(error);
	}
};

const sortPokemons = (sortType) => {
	switch (sortType) {
		case "a-z":
			return {
				"favouritePokemons.name": 1,
			};

		case "z-a":
			return {
				"favouritePokemons.name": -1,
			};

		case "health":
			return {
				"favouritePokemons.stats[0].base_stat": 1,
			};

		case "attack": {
		}
		case "defense": {
		}
		case "special_attack": {
		}
		case "special_defense": {
		}
		case "speed": {
		}
		default:
			return {
				"favouritePokemons.name": 1,
			};
	}
};
