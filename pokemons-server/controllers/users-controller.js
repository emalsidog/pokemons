// Models
const User = require("../models/User");

// Utils
const getParsedTeam = require("../utils/get-parsed-team");

exports.getUsers = async (req, res, next) => {
	const { page = 1 } = req.query;
	const limit = 5;

	try {
		const dbUsers = await User.find()
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.exec();

		const totalCount = await User.countDocuments();

		const parsedUsers = await Promise.all(
			dbUsers.map(async (user) => {
				const parsedTeam = await getParsedTeam(user.teamPokemons, { withTotal: false });
				return {
					id: user._id,
					username: user.username,
					teamPokemons: parsedTeam,
					warPoints: user.warPoints,
				};
			})
		)

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