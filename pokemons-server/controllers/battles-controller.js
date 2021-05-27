// Models
const Battle = require("../models/Battle");

// Utils
const createPlayer = require("../utils/battles-utils/create-player");
const getParsedTeam = require("../utils/get-parsed-team");
const ErrorResponse = require("../utils/error-response");
const { populationFields } = require("../utils/populate-user");

exports.getUserBattles = async (req, res, next) => {
	let { sort = "time-descending" } = req.query;

	try {
		const user = await User.aggregate([
			{ $match: { _id: req.user._id } },
			{ $project: { battles: 1 } },
			{ $unwind: "$battles" },
			{
				$lookup: {
					from: "battles",
					localField: "battles.battleId",
					foreignField: "_id",
					as: "battles.battle",
				},
			},
			{ $unwind: "$battles.battle" },
			{ $sort: createSortingOptions(sort.toLowerCase()) },
			{
				$group: {
					_id: "$_id",
					root: { $mergeObjects: "$$ROOT" },
					battles: { $push: "$battles" },
				},
			},
			{
				$replaceRoot: {
					newRoot: {
						$mergeObjects: ["$root", "$$ROOT"],
					},
				},
			},
			{ $project: { root: 0 } },
		]).exec();
		
		let battles;
		user[0] ? (battles = user[0].battles) : (battles = []);

		res.status(200).json({
			status: {
				isError: false,
				message: "Done.",
			},
			body: {
				battles,
			},
		});
	} catch (error) {
		next(error);
	}
};

exports.battle = async (req, res, next) => {
	try {
		if (!req.user.warParticipant) {
			return next(
				new ErrorResponse("You are now the war particapant.", 400)
			);
		}

		// Get random opponent
		let randomArray = await User.aggregate([
			{
				$match: {
					_id: { $ne: req.user._id },
					warParticipant: { $ne: false },
				},
			},
			{ $sample: { size: 1 } },
		]).exec();

		if (randomArray.length <= 0) {
			return next(new ErrorResponse("Could not find opponent.", 400));
		}

		// Populate fields
		const randomUser = await User.findById(randomArray[0]._id)
			.select("_id username teamPokemons battles warPoints")
			.populate("teamPokemons", populationFields);

		if (!randomUser) {
			return next(new ErrorResponse("Could not find opponent.", 400));
		}

		const parsedCurrentUser = await req.user
			.populate("teamPokemons", populationFields)
			.execPopulate();

		// Parse team
		const [opponentTeam, opponentTeamTotal] = getParsedTeam(
			randomUser.teamPokemons,
			{ withTotal: true }
		);

		const [currentUserTeam, currentUserTeamTotal] = getParsedTeam(
			parsedCurrentUser.teamPokemons,
			{ withTotal: true }
		);

		// Create clear player objects (to compare and send to client)
		const currentUser = createPlayer(
			parsedCurrentUser,
			currentUserTeam,
			currentUserTeamTotal
		);
		const opponent = createPlayer(
			randomUser,
			opponentTeam,
			opponentTeamTotal
		);

		// Decide the winner
		const winPoints = 10;
		const tiePoints = 5;
		const losePoints = 0;

		if (currentUser.teamTotal > opponent.teamTotal) {
			const battle = new Battle({
				winner: currentUser,
				loser: opponent,
				result: "hasWinner",
			});

			parsedCurrentUser.warPoints += winPoints;

			pushBattle(parsedCurrentUser, winPoints, battle._id);
			pushBattle(randomUser, losePoints, battle._id);

			await parsedCurrentUser.save();
			await randomUser.save();
			await battle.save();

			res.status(200).json({
				status: {
					isError: false,
					message: `Battle ended. The winner is ${currentUser.username}`,
				},
				body: {
					winner: currentUser,
					loser: opponent,
					result: battle.result,
				},
			});
		} else if (currentUser.teamTotal < opponent.teamTotal) {
			const battle = new Battle({
				winner: opponent,
				loser: currentUser,
				currentUserPoints: losePoints,
				result: "hasWinner",
			});

			randomUser.warPoints += winPoints;

			pushBattle(parsedCurrentUser, losePoints, battle._id);
			pushBattle(randomUser, winPoints, battle._id);

			await randomUser.save();
			await parsedCurrentUser.save();
			await battle.save();

			res.status(200).json({
				status: {
					isError: false,
					message: `Battle ended. The winner is ${opponent.username}`,
				},
				body: {
					winner: opponent,
					loser: currentUser,
					result: battle.result,
				},
			});
		} else if (currentUser.teamTotal === opponent.teamTotal) {
			const battle = new Battle({
				winner: opponent,
				loser: currentUser,
				currentUserPoints: tiePoints,
				result: "tie",
			});

			randomUser.warPoints += tiePoints;
			parsedCurrentUser.warPoints += tiePoints;

			pushBattle(parsedCurrentUser, tiePoints, battle._id);
			pushBattle(randomUser, tiePoints, battle._id);

			await randomUser.save();
			await parsedCurrentUser.save();
			await battle.save();

			res.status(200).json({
				status: {
					isError: false,
					message: "Battle ended. Tie!",
				},
				body: {
					winner: opponent,
					loser: currentUser,
					result: battle.result,
				},
			});
		}
	} catch (error) {
		next(error);
	}
};

const pushBattle = (user, points, battleId) => {
	if (user.battles.length > 9) {
		user.battles.splice(0, 1);
		user.battles.push({
			battleId,
			earnedPoints: points,
		});
	} else {
		user.battles.push({
			battleId,
			earnedPoints: points,
		});
	}
}


// Sorting options
const createSortingOptions = (sortingType) => {
	switch (sortingType) {
		case "time-descending": {
			return {
				"battles.battle.createdAt": -1,
			};
		}
		case "time-ascending": {
			return {
				"battles.battle.createdAt": 1,
			};
		}
		case "points-descending": {
			return {
				"battles.earnedPoints": -1,
			};
		}
		case "points-ascending": {
			return {
				"battles.earnedPoints": 1,
			};
		}
		default: {
			return {
				"battles.battle.createdAt": -1,
			};
		}
	}
};
