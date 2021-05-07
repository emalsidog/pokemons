// Dependencies
const { validationResult } = require("express-validator");

// Models
const User = require("../models/User");

// Utils
const ErrorResponse = require("../utils/error-response");
const transformName = require("../utils/transform-name");

// POST => update/name
exports.updateName = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}
	const { givenName, familyName } = req.body;

	try {
		const user = await User.findByIdAndUpdate(
			req.user._id,
			{
				givenName: transformName(givenName),
				familyName: transformName(familyName),
			},
			{ new: true }
		);

		res.status(200).json({
			status: {
				isError: false,
				message: "Saved.",
			},
			body: {
				givenName: user.givenName,
				familyName: user.familyName,
			},
		});
	} catch (error) {
		next(error);
	}

	res.status(200);
};

// POST => /update/email
exports.updateEmail = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}

	const { email } = req.body;

	try {
		// Find user
		const user = await User.findById(req.user._id);
		if (!user) {
			return next(new ErrorResponse("User does not exist", 400));
		}

		// Check if email is alredy exists
		const emailExists = await User.findOne({ email });
		if (emailExists) {
			return next(new ErrorResponse("Email is already taken", 400));
		}

		user.email = email;
		await user.save();

		res.status(200).json({
			status: {
				isError: false,
				message: "Saved.",
			},
			body: {
				email: user.email,
			},
		});
	} catch (error) {
		next(error);
	}
};

// POST => /update/username
exports.updateUsername = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}

	const { username } = req.body;

	try {
		// Finding user
		const user = await User.findById(req.user._id);
		if (!user) {
			return next(new ErrorResponse("User does not exist", 400));
		}

		// Check if username is already taken
		const usernameExists = await User.findOne({ username });
		if (usernameExists) {
			return next(new ErrorResponse("Username is already taken", 400));
		}

		user.username = username;
		await user.save();

		res.status(200).json({
			status: {
				isError: false,
				message: "Saved.",
			},
			body: {
				username: user.username,
			},
		});
	} catch (error) {
		next(error);
	}
};

// POST => /update/phone
exports.updatePhone = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}

	const { phone } = req.body;

	try {
		// Finding user
		const user = await User.findById(req.user._id);
		if (!user) {
			return next(new ErrorResponse("User does not exist", 400));
		}

		user.phone = phone;
		await user.save();

		res.status(200).json({
			status: {
				isError: false,
				message: "Saved.",
			},
			body: {
				phone: user.phone,
			},
		});
	} catch (error) {
		next(error);
	}
};

// GET => /update/war-participant
exports.updateWarParticipant = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user) {
			return next(new ErrorResponse("User does not exist", 400));
		}

		if (user.teamPokemons.length < 5) {
			return next(
				new ErrorResponse(
					"You need to have full team to be war participant!",
					400
				)
			);
		}

		user.warParticipant = !user.warParticipant;
		await user.save();

		res.status(200).json({
			status: {
				isError: false,
				message: "Saved.",
			},
			body: {
				warParticipant: user.warParticipant,
			},
		});
	} catch (error) {
		next(error);
	}
};
