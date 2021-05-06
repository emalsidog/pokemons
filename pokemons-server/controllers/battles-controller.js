// Models
const Battle = require("../models/Battle");

// Utils
const createPlayer = require("../utils/battles-utils/create-player");
const getParsedTeam = require("../utils/get-parsed-team");
const ErrorResponse = require("../utils/error-response");

exports.getUserBattles = async (req, res, next) => {
	let { sort = "time-descending" } = req.query;
	sort = sort.toLowerCase();

	try {
		const user = await User.findById(req.user._id)
			.populate("battles")
			.exec();

		let battles = user.battles;

		if (sort === "time-descending") {
			battles.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);
		} else if (sort === "time-ascending") {
			battles.sort(
				(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
			);
		} else if (sort === "points-descending") {
			battles.sort(
				(a, b) =>
					new Date(b.currentUserPoints) -
					new Date(a.currentUserPoints)
			);
		} else if (sort === "points-ascending") {
			battles.sort(
				(a, b) =>
					new Date(a.currentUserPoints) -
					new Date(b.currentUserPoints)
			);
		}

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
		const [
			opponentTeam,
			opponentTeamTotal,
		] = await getParsedTeam(randomUser.teamPokemons, { withTotal: true });

		const [currentUserTeam, currentUserTeamTotal] = await getParsedTeam(
			req.user.teamPokemons,
			{ withTotal: true }
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
		const losePoints = 0;

		if (currentUser.teamTotal > opponent.teamTotal) {
			const battle = new Battle({
				winner: currentUser,
				loser: opponent,
				currentUserPoints: winPoints,
				result: "hasWinner",
			});

			req.user.warPoints += winPoints;
			req.user.battles.push(battle._id);
			randomUser.battles.push(battle._id);

			await req.user.save();
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
			randomUser.battles.push(battle._id);
			req.user.battles.push(battle._id);

			await randomUser.save();
			await req.user.save();
			await battle.save();
			
			res.status(200).json({
				status: {
					isError: false,
					message: `Battle ended. The winner is ${opponent.username}`,
				},
				body: {
					winner: opponent,
					loser: currentUser,
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
			req.user.warPoints += tiePoints;
			randomUser.battles.push(battle._id);
			req.user.battles.push(battle._id);

			await randomUser.save();
			await req.user.save();
			await battle.save();

			res.status(200).json({
				status: {
					isError: false,
					message: `Battle ended. Tie!`,
				},
				body: {
					winner: opponent,
					loser: currentUser,
				},
			});
		}
	} catch (error) {
		next(error);
	}
};
