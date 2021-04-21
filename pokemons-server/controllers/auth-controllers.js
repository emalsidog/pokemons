// Dependencies
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Utils
const sendMail = require("../utils/sendMail");
const response = require("../utils/response");

// Models
const User = require("../models/User");

// POST => /users/register
exports.register = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}

	const {	givenName, familyName, email, username, password, confirmPassword } = req.body;

	if (password !== confirmPassword) {
		return response(res, 400, "Passwords do not match", true);
	}

	try {
		const user = await User.findOne({ $or: [{ email }, { username }] });
		if (user) {
			return response(res, 400, "Email or username is already taken.", true);
		}

		const newUser = {givenName,	familyName,	email, username, password };
		const activationToken = createActivationToken(newUser);

		const url = `${process.env.CLIENT_URL}/users/activate/${activationToken}`;
		const subject = "Pokemons | Verify your identity";
		const html = `
            <p>To verify your identity please click the following link: </p>
            <p>${url}</p>
        `;
		sendMail({ to: email, subject, html });

		response(res, 200, "Check your inbox", false);
	} catch (error) {
		response(res, 500, "Something went wrong. Please, try again later.", true );
	}
};

// POST => /users/activate
exports.activate = async (req, res) => {
	const { activationToken } = req.body;
	try {
		const user = jwt.verify(
			activationToken,
			process.env.ACTIVATION_TOKEN_SECRET
		);
		const { givenName, familyName, email, username, password } = user;

		const exists = await User.findOne({ $or: [{ email }, { username }] });
		if (exists) {
			return response(res, 400, "Failed to activate. Email or username is already taken.", true);
		}

		const newUser = new User({ givenName, familyName, email, username, password });
		await newUser.save();

		response(res, 201, "Account has been successfully created. Please, login now.",	false);
	} catch (error) {
		response(res, 500, "Something went wrong. Please, try again later.", true);
	}
};

// POST => /users/login
exports.login = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return response(res, 400, "Email does not exist.", true);
		}

		const isMatch = await user.comparePasswords(password);
		if (!isMatch) {
			return response(res, 400, "Password is incorrect.", true);
		}

		const accessToken = createAccessToken(user._id);

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
					username: user.username
				}
			},
		});
	} catch (error) {
		response(res, 500, "Something went wrong. Please, try again later.", true);
	}
};

// POST => /users/forgot
exports.forgot = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}

	const { email } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return response(res, 400, "Email does not exist.", true);
		}

		const resetToken = createResetToken(user._id);

		const url = `${process.env.CLIENT_URL}/users/reset/${resetToken}`;
		const subject = "Pokemons | Reset your password";
		const html = `
            <p>You have requested a process to reset your password. Click the link below an follow the instructions</p>
            <p>${url}</p>
        `;
		sendMail({ to: email, subject, html });

		response(res, 200, "Your request is successfull. Check your inbox!", false);
	} catch (error) {
		response(res, 500, "Something went wrong. Please, try again later.", true);
	}
};

// POST => /users/reset
exports.reset = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}
	const { password, confirmPassword, resetToken } = req.body;

	if (password !== confirmPassword) {
		response(res, 400, "Passwords do not match", true);
	}

	try {
		const { id } = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);

		const user = await User.findById(id);
		if (!user) {
			return response(res, 500, "Something went wrong. Please, try again later.",	true);
		}

		user.password = password;
		await user.save();

		const subject = "Pokemons | Password has been successfully reseted";
		const html = `<p>Your password has been changed.</p>`;

		sendMail({to: user.email, subject, html });

		response(res, 200, "Password has been successfully changed. Login now!", false);
	} catch (error) {
		response(res, 500, "Something went wrong. Please, try again later.", true);
	}
};

// Creating activation token
const createActivationToken = (newUser) => {
	return jwt.sign(newUser, process.env.ACTIVATION_TOKEN_SECRET, {
		expiresIn: "1h",
	});
};

// Creating access token
const createAccessToken = (id) => {
	return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "7d",
	});
};

// Creating password reset token
const createResetToken = (id) => {
	return jwt.sign({ id }, process.env.RESET_TOKEN_SECRET, {
		expiresIn: "15m",
	});
};
