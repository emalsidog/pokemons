// Models
const Battle = require("../models/Battle");

// Utils
const createPlayer = require("../utils/battles-utils/create-player");
const getParsedTeam = require("../utils/battles-utils/get-parsed-team");
const ErrorResponse = require("../utils/error-response");

exports.getUserBattles = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id)
			.populate("battles")
			.exec();

		res.status(200).json({
			status: {
				isError: false,
				message: "Done.",
			},
			body: {
				battles: user.battles,
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

		let randomArray = await User.aggregate([
			{
				$match: {
					_id: { $ne: req.user._id },
					warParticipant: { $ne: false },
				},
			},
			{ $sample: { size: 1 } },
		]).exec();
		const randomUser = await User.findById(randomArray[0]._id);

		if (!randomUser) {
			return next(new ErrorResponse("Could not find opponent.", 400));
		}

		// Parse team
		const [opponentTeam, opponentTeamTotal] = await getParsedTeam(
			randomUser.teamPokemons
		);
		const [currentUserTeam, currentUserTeamTotal] = await getParsedTeam(
			req.user.teamPokemons
		);

		// Create clear player objects (to compare and send to client)
		const currentUser = createPlayer(
			req.user,
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

		if (currentUser.teamTotal > opponent.teamTotal) {
			const battle = new Battle({
				winner: currentUser,
				loser: opponent,
				result: "hasWinner",
			});

			req.user.warPoints += winPoints;
			req.user.battles.push(battle._id);
			randomUser.battles.push(battle._id);

			await req.user.save();
			await randomUser.save();
			await battle.save();

			res.status(200).json({
				winner: currentUser,
				loser: opponent,
			});
		} else if (currentUser.teamTotal < opponent.teamTotal) {
			const battle = new Battle({
				winner: opponent,
				loser: currentUser,
				result: "hasWinner",
			});

			randomUser.warPoints += winPoints;
			randomUser.battles.push(battle._id);
			req.user.battles.push(battle._id);

			await randomUser.save();
			await req.user.save();
			await battle.save();

			res.status(200).json({
				winner: opponent,
				loser: currentUser,
			});
		} else if (currentUser.teamTotal === opponent.teamTotal) {
			const battle = new Battle({
				winner: opponent,
				loser: currentUser,
				result: "tie",
			});

			randomUser.warPoints += tiePoints;
			req.user.warPoints += tiePoints;
			randomUser.battles.push(battle._id);
			req.user.battles.push(battle._id);

			await randomUser.save();
			await req.user.save();
			await battle.save();

			res.status(200).json({
				winner: opponent,
				loser: currentUser,
			});
		}
	} catch (error) {
		next(error);
	}
};
