// Dependencies
const { validationResult } = require("express-validator");

// Models
const User = require("../models/User");

// Utils
const response = require("../utils/response");

// POST => /update-user
exports.updateUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}

	try {
		const { givenName, familyName, email, phone, username } = req.body;

		// Finding user
		const user = await User.findById(req.user._id);
		if (!user) {
			return response(res, 400, "User does not exist.", true);
		}

		// Check if email or username is already taken
		const users = await User.find({ $or: [{ email }, { username }] });
		if (users.length !== 0) {
			return response(res, 400, "Email or username is alredy taken.",	true);
		}

		// Updating
		user.givenName = givenName;
		user.familyName = familyName;
		user.email = email;
		user.phone = phone;
		user.username = username;
		await user.save();

		res.status(200).json({
			status: {
				isError: false,
				message: "Account is successfully updated.",
			},
			body: {
				user: {
					givenName: user.givenName,
					familyName: user.familyName,
					email: user.email,
					phone: user.phone,
					username: user.username,
				},
			},
		});
	} catch (error) {
		response(res, 500, "Something went wrong. Please, try again later.", true);
	}
};
