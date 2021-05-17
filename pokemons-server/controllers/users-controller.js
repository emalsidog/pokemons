// Models
const User = require("../models/User");

// Utils
const getParsedTeam = require("../utils/get-parsed-team");
const { populationFields } = require("../utils/populate-user");

exports.getUsers = async (req, res, next) => {
	const { page = 1 } = req.query;
	const limit = 5;

	try {
		const dbUsers = await User.find()
			.select("_id username teamPokemons warPoints")
			.populate("teamPokemons", populationFields)
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.exec();

		const totalCount = await User.countDocuments();

		const parsedUsers = await Promise.all(
			dbUsers.map(async (user) => {
				const { _id, username, teamPokemons, warPoints } = user;

				const parsedTeam = getParsedTeam(teamPokemons, {
					withTotal: false,
				});

				return {
					id: _id,
					username,
					teamPokemons: parsedTeam,
					warPoints,
				};
			})
		);

		res.status(200).json({
			status: {
				message: "Done.",
				isError: false,
			},
			body: {
				users: parsedUsers,
				totalCount,
				limit,
			},
		});
	} catch (error) {
		next(error);
	}
};
