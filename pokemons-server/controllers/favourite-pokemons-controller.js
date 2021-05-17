// Models
const User = require("../models/User");

// Utils
const ErrorResponse = require("../utils/error-response");
const getParsedTeam = require("../utils/get-parsed-team");
const sortPokemons = require("../utils/sort-pokemons");
const isPokemonIdValid = require("../utils/pokemonId-validation");
const { populationFields, populateUser } = require("../utils/populate-user");

// GET => /pokemons/favourite
exports.get = async (req, res, next) => {
	const { sort = "a-z" } = req.query;

	try {
		const user = await User.findById(req.user._id)
			.populate("favouritePokemons", populationFields)
			.exec();

		if (!user) {
			return next(new ErrorResponse("Unauthorized.", 401));
		}

		const parsedTeam = getParsedTeam(user.favouritePokemons, {
			withTotal: false,
		});

		sortPokemons(parsedTeam, sort.toLowerCase());

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
				"favouritePokemons": { $ne: pokemonId },
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
