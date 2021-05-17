// Models
const Pokemon = require("../models/Pokemon");

// Utils
const getParsedTeam = require("../utils/get-parsed-team");
const { populationFields } = require("../utils/populate-user");

exports.get = async (req, res, next) => {
	const { page = 1 } = req.query;
    let { limit = 12 } = req.query;

    if (limit > 24) {
        limit = 24;
    }

	try {
		const pokemons = await Pokemon.find({})
			.select(populationFields)
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.exec();

		const totalCount = await Pokemon.countDocuments();;

		const parsedPokemons = getParsedTeam(pokemons, {
			withTotal: false,
		});

		res.status(200).json({
			status: {
				isError: false,
				messahge: "Done.",
			},
			body: {
				totalCount,
				pokemons: parsedPokemons,
			},
		});
	} catch (error) {
		next(error);
	}
};
