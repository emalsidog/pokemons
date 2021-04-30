// Models
const User = require("../models/User");

exports.getUsers = async (req, res, next) => {
	const { page = 1 } = req.query;
	const limit = 5;

	try {
		const dbUsers = await User.find()
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.exec();

		const totalCount = await User.countDocuments();

		const users = dbUsers.map((user) => {
			return {
				id: user._id,
				username: user.username,
				teamPokemons: user.teamPokemons,
				warPoints: user.warPoints,
			};
		});

		res.status(200).json({
			status: {
				message: "Done.",
				isError: false,
			},
			body: {
				users,
				totalCount,
				limit,
			},
		});
	} catch (error) {
		next(error);
	}
};