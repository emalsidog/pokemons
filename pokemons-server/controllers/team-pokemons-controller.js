// Models
const User = require("../models/User");

// Utils
const ErrorResponse = require("../utils/error-response");
const getParsedTeam = require("../utils/get-parsed-team");
const isPokemonIdValid = require("../utils/pokemonId-validation");
const { populationFields, populateUser } = require("../utils/populate-user");

// GET => /pokemons/team
exports.get = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id)
			.populate("teamPokemons", populationFields)
			.exec();

		if (!user) {
			return next(new ErrorResponse("Unauthorized.", 401));
		}

		const parsedTeam = getParsedTeam(user.teamPokemons, {
			withTotal: false,
		});

		res.status(200).json({
			status: {
				isError: false,
				message: "Done.",
			},
			body: {
				teamPokemons: parsedTeam,
			},
		});
	} catch (error) {
		next(error);
	}
};

// POST => /pokemons/team/add
exports.add = async (req, res, next) => {
	const { pokemonId } = req.body;

	const validationResult = isPokemonIdValid(pokemonId);
	if (!validationResult.isValid) {
		return next(new ErrorResponse(validationResult.message, 400));
	}

	try {
		const user = await User.findById(req.user._id);
		const { teamPokemons, warParticipant } = user;

		if (teamPokemons.length > 4) {
			return next(new ErrorResponse("Your team is full.", 400));
		}

		const result = teamPokemons.find(
			(id) => id.toString() === pokemonId.toString()
		);

		if (result) {
			return next(new ErrorResponse("Already in your team.", 400));
		}

		teamPokemons.push(pokemonId);

		if (teamPokemons.length === 5 && !warParticipant) {
			user.warParticipant = true;
		}
		await user.save();

		const populatedUser = await populateUser(user, "teamPokemons");
		const parsedTeam = getParsedTeam(populatedUser.teamPokemons, {
			withTotal: false,
		});

		res.status(200).json({
			status: {
				isError: false,
				message: "Added to team.",
			},
			body: {
				teamPokemons: parsedTeam,
				warParticipant: user.warParticipant,
			},
		});
	} catch (error) {
		next(error);
	}
};

// POST => /pokemons/team/remove
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
					teamPokemons: pokemonId,
				},
			},
			{
				new: true,
			}
		);

		const { teamPokemons, warParticipant } = user;

		if (teamPokemons.length < 5 && warParticipant) {
			user.warParticipant = false;
		}
		await user.save();

		const populatedUser = await populateUser(user, "teamPokemons");
		const parsedTeam = getParsedTeam(populatedUser.teamPokemons, {
			withTotal: false,
		});

		res.status(200).json({
			status: {
				isError: false,
				message: "Removed from team.",
			},
			body: {
				teamPokemons: parsedTeam,
				warParticipant: user.warParticipant,
			},
		});
	} catch (error) {
		next(error);
	}
};
