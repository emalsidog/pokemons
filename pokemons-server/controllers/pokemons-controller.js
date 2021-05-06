// Dependencies
const got = require("got");

// Utils
const getParsedTeam = require("../utils/get-parsed-team");

exports.get = async (req, res, next) => {
	const { page = 1 } = req.query;
    let { limit = 12 } = req.query;

    if (limit > 24) {
        limit = 24;
    }

	const offset = (page - 1) * limit;
	let totalCount = 0;

	try {
		const { body } = await got(
			`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
		);
		const parsedBody = JSON.parse(body);

		totalCount = parsedBody.count;

		const parsedPokemons = await getParsedTeam(parsedBody.results, {
			withTotal: false,
			bodyHasUrl: true,
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
