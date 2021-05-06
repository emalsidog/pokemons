// Models
const User = require("../models/User");

// Utils
const ErrorResponse = require("../utils/error-response");
const getParsedTeam = require("../utils/get-parsed-team");

// GET => /pokemons/team
exports.get = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user) {
			return next(new ErrorResponse("Unauthorized.", 401));
		}

		const parsedTeam = await getParsedTeam(user.teamPokemons, {
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
}

// POST => /pokemons/team/add
exports.add = async (req, res, next) => {
	const { pokemonId } = req.body;

	if (!pokemonId) {
		return next(new ErrorResponse("Pokemon id is not specified.", 400));
	}

    if (isNaN(pokemonId)) {
        return next(new ErrorResponse("Pokemon id is invalid.", 400));
    }

	try {
		const user = await User.findById(req.user._id);
		const { teamPokemons, warParticipant } = user;

		if (teamPokemons.length > 4) {
			return next(new ErrorResponse("Your team is full.", 400));
		}

		const result = teamPokemons.find(
			(pokemon) => (pokemon.pokemonId == pokemonId)
		);
		
        if (result) {
            return next(new ErrorResponse("Already in your team.", 400));
        }

        teamPokemons.push({ pokemonId });
		if (teamPokemons.length === 5) {
			if (!warParticipant) {
				user.warParticipant = true;
			}
		}
        await user.save();

		res.status(200).json({
			status: {
				isError: false,
				message: "Added.",
			},
			body: {
				teamPokemons: user?.teamPokemons,
				warParticipant: user.warParticipant
			},
		});
	} catch (error) {
		next(error);
	}
};

// POST => /pokemons/team/remove
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
					teamPokemons: { pokemonId },
				},
			},
			{
				new: true,
			}
		);

		const { teamPokemons, warParticipant } = user;
		if (teamPokemons.length < 5) {
			if (warParticipant) {
				user.warParticipant = false;
			}
		}

		await user.save();

		res.status(200).json({
			status: {
				isError: false,
				message: "Removed.",
			},
			body: {
				teamPokemons: user.teamPokemons,
				warParticipant: user.warParticipant
			},
		});
    } catch (error) {
        next(error);
    }
};
