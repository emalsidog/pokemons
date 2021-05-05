// Dependencies
const mongoose = require("mongoose");

const BattleSchema = new mongoose.Schema(
	{
		winner: {
			type: Object,
		},
		loser: {
			type: Object,
		},
		currentUserPoints: {
			type: Number,
		},
		result: {
			type: String,
			enum: ["tie", "hasWinner"],
		},
	},
	{
		capped: {
			max: 10,
			size: 50000,
			autoIndexId: true,
		},

		timestamps: true,
	}
);

module.exports = Battle = mongoose.model("Battle", BattleSchema);
