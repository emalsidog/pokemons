// Dependencies
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Utils
const sendMail = require("../utils/sendMail");
const ErrorResponse = require("../utils/error-response");
const transformName = require("../utils/transform-name");
const getParsedTeam = require("../utils/get-parsed-team");
const { populationFields } = require("../utils/populate-user");

// Models
const User = require("../models/User");

// POST => /users/register
exports.register = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const message = errors.array()[0].msg;
		return next(new ErrorResponse(message, 422));
	}

	const {
		givenName,
		familyName,
		email,
		username,
		password,
		confirmPassword,
	} = req.body;

	if (password !== confirmPassword) {
		return next(new ErrorResponse("Passwords do not match", 400));
	}

	try {
		const user = await User.findOne({ $or: [{ email }, { username }] });
		if (user) {
			return next(
				new ErrorResponse("Email or username is already taken.", 400)
			);
		}

		const newUser = { givenName, familyName, email, username, password };
		const activationToken = createToken(
			newUser,
			process.env.ACTIVATION_TOKEN_SECRET,
			"1h"
		);

		const url = `${process.env.CLIENT_URL}/users/activate/${activationToken}`;
		const subject = "Pokemons | Verify your identity";
		const html = `
            <p>To verify your identity please click the following link: </p>
            <p>${url}</p>
        `;
		sendMail({ to: email, subject, html });

		res.status(200).json({
			status: {
				isError: false,
				message: "Check your inbox!",
			},
		});
	} catch (error) {
		next(error);
	}
};

// POST => /users/activate
exports.activate = async (req, res, next) => {
	const { activationToken } = req.body;
	try {
		const user = jwt.verify(
			activationToken,
			process.env.ACTIVATION_TOKEN_SECRET
		);
		const { givenName, familyName, email, username, password } = user;

		const exists = await User.findOne({ $or: [{ email }, { username }] });
		if (exists) {
			return next(
				new ErrorResponse(
					"Failed to activate. Email or username is already taken.",
					400
				)
			);
		}
		const newUser = new User({
			givenName: transformName(givenName),
			familyName: transformName(familyName),
			email: email.toLowerCase(),
			username,
			password,
		});
		await newUser.save();

		res.status(201).json({
			status: {
				isError: false,
				message:
					"Account has been successfully created. Please, login now.",
			},
		});
	} catch (error) {
		next(error);
	}
};

// POST => /users/login
exports.login = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const message = errors.array()[0].msg;
		return next(new ErrorResponse(message, 422));
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email: email.toLowerCase() })
			.populate("favouritePokemons", populationFields)
			.populate("teamPokemons", populationFields)
			.exec();
			
		if (!user) {
			return next(new ErrorResponse("Email does not exist.", 400));
		}

		const isMatch = await user.comparePasswords(password);
		if (!isMatch) {
			return next(new ErrorResponse("Password is incorrect.", 400));
		}

		const accessToken = createToken(
			{ id: user._id },
			process.env.ACCESS_TOKEN_SECRET,
			"7d"
		);

		const parsedTeamPokemons = getParsedTeam(user.teamPokemons, {
			withTotal: false,
		});
		const parsedFavouritePokemons = getParsedTeam(
			user.favouritePokemons,
			{
				withTotal: false,
			}
		);

		res.status(200).json({
			status: {
				message: "Successfully logged in.",
				isError: false,
			},
			body: {
				accessToken,
				user: {
					givenName: user.givenName,
					familyName: user.familyName,
					email: user.email,
					username: user.username,
					phone: user.phone,
					warParticipant: user.warParticipant,
				},
				favouritePokemons: parsedFavouritePokemons,
				teamPokemons: parsedTeamPokemons,
			},
		});
	} catch (error) {
		next(error);
	}
};

// POST => /users/forgot
exports.forgot = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const message = errors.array()[0].msg;
		return next(new ErrorResponse(message, 422));
	}

	const { email } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return next(new ErrorResponse("Email does not exist.", 400));
		}

		const payload = {
			id: user._id,
			hash: user.password.substr(6, 13),
		};

		const resetToken = createToken(
			payload,
			process.env.RESET_TOKEN_SECRET,
			"15m"
		);

		const url = `${process.env.CLIENT_URL}/users/reset/${resetToken}`;
		const subject = "Pokemons | Reset your password";
		const html = `
            <p>You have requested a process to reset your password. Click the link below an follow the instructions</p>
            <p>${url}</p>
        `;
		sendMail({ to: email, subject, html });

		res.status(200).json({
			status: {
				isError: false,
				message: "Your request is successfull. Check your inbox!",
			},
		});
	} catch (error) {
		next(error);
	}
};

// POST => /users/reset
exports.reset = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const message = errors.array()[0].msg;
		return next(new ErrorResponse(message, 422));
	}
	const { password, confirmPassword, resetToken } = req.body;

	if (password !== confirmPassword) {
		return next(new ErrorResponse("Passwords do not match", 400));
	}

	try {
		const { id, hash } = jwt.verify(
			resetToken,
			process.env.RESET_TOKEN_SECRET
		);

		const user = await User.findById(id);
		if (!user) {
			return next(
				new ErrorResponse(
					"Something went wrong. Please, try again later.",
					400
				)
			);
		}

		if (hash !== user.password.substr(6, 13)) {
			return next(new ErrorResponse("Token has been already used.", 400));
		}

		user.password = password;
		await user.save();

		const subject = "Pokemons | Password has been successfully reseted";
		const html = `<p>Your password has been changed.</p>`;

		sendMail({ to: user.email, subject, html });

		res.status(200).json({
			status: {
				isError: false,
				message: "Password has been successfully changed. Login now!",
			},
		});
	} catch (error) {
		next(error);
	}
};

// GET => /users/current-user
exports.getCurrentUser = (req, res) => {
	try {
		res.status(200).json({
			status: {
				isError: false,
				message: "Done.",
			},
			body: {
				user: {
					givenName: req.user.givenName,
					familyName: req.user.familyName,
					email: req.user.email,
					username: req.user.username,
					phone: req.user.phone,
					warParticipant: req.user.warParticipant,
				},
			},
		});
	} catch (error) {
		res.status(401).json({
			isError: true,
			message: "Unauthorized.",
		});
	}
};

const createToken = (payload, secretKey, expireTime) => {
	return jwt.sign(payload, secretKey, {
		expiresIn: expireTime,
	});
};
