// Dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Defining schema
const UserSchema = new mongoose.Schema(
	{
		givenName: {
			type: String,
			required: true,
		},
		familyName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		username: {
			type: String,
			unique: true,
			required: true,
		},
		phone: {
			type: Number,
			default: null,
		},
		warParticipant: {
			type: Boolean,
			default: false,
		},
		warPoints: {
			type: Number,
			default: 0,
		},
		battles: [
			{
				battleId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Battle",
				},
				earnedPoints: {
					type: Number,
					required: true,
				},
				_id: false
			},
		],
		favouritePokemons: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "Pokemon" },
		],
		teamPokemons: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "Pokemon" },
		],
	},
	{
		timestamps: true,
	}
);

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

UserSchema.methods.comparePasswords = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = User = mongoose.model("User", UserSchema);
