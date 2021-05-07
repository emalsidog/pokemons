// Models
const User = require("../models/User");

// Utils
const ErrorResponse = require("../utils/error-response");
const getParsedTeam = require("../utils/get-parsed-team");
const sortPokemons = require("../utils/sort-pokemons");

// GET => /pokemons/favourite
exports.get = async (req, res, next) => {
	const { sort = "a-z" } = req.query;
	
	try {	
		const user = await User.findById(req.user._id);
		if (!user) {
			return next(new ErrorResponse("Unauthorized.", 401));
		}

		const parsedTeam = await getParsedTeam(user.favouritePokemons, {
			withTotal: false
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
}

// POST => /pokemons/favourite/add
exports.add = async (req, res, next) => {
	const { pokemonId } = req.body;

	if (!pokemonId) {
		return next(new ErrorResponse("Pokemon id is not specified.", 400));
	}

    if (isNaN(pokemonId)) {
        return next(new ErrorResponse("Pokemon id is invalid.", 400));
    }

	try {
		const user = await User.findOneAndUpdate(
			{
				_id: req.user._id,
				"favouritePokemons.pokemonId": { $ne: pokemonId },
			},
			{ $push: { favouritePokemons: { pokemonId } } },
			{ new: true }
		);

		res.status(200).json({
			status: {
				isError: false,
				message: "Added.",
			},
			body: {
				favouritePokemons: user?.favouritePokemons,
			},
		});
	} catch (error) {
		next(error);
	}
};

// POST => /pokemons/favourite/remove
exports.remove = async (req, res, next) => {
	const { pokemonId } = req.body;

	if (!pokemonId) {
		return next(new ErrorResponse("Pokemon id is not specified.", 400));
	}

    if (isNaN(pokemonId)) {
        return next(new ErrorResponse("Pokemon id is invalid.", 400));
    }

	try {

		const user = await User.findByIdAndUpdate(
			req.user._id,
			{
				$pull: {
					favouritePokemons: { pokemonId },
				},
			},
			{
				new: true,
			}
		);

		res.status(200).json({
			status: {
				isError: false,
				message: "Removed.",
			},
			body: {
				favouritePokemons: user.favouritePokemons,
			},
		});
	} catch (error) {
		next(error);
	}
};

