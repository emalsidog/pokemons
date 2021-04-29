// Dependencies
const mongoose = require("mongoose");

const BattleSchema = new mongoose.Schema(
	{
		winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		loser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        result: {
            type: String,
            enum: ["tie", "hasWinner"]
        }
	},
	{
		timestamps: true,
	}
);

module.exports = Battle = mongoose.model("Battle", BattleSchema);
