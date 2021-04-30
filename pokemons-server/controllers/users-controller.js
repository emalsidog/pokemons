// Dependencies
const got = require("got");

// Models
const User = require("../models/User");
const Battle = require("../models/Battle");

// Utils
const ErrorResponse = require("../utils/error-response");

exports.getUsers = async (req, res, next) => {
	const { page = 1 } = req.query;
	const limit = 5;

	try {
		const dbUsers = await User.find()
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.exec();

		const totalCount = await User.countDocuments();

		const users = dbUsers.map((user) => {
			return {
				id: user._id,
				username: user.username,
				teamPokemons: user.teamPokemons,
				warPoints: user.warPoints,
			};
		});

		res.status(200).json({
			status: {
				message: "Done.",
				isError: false,
			},
			body: {
				users,
				totalCount,
				limit,
			},
		});
	} catch (error) {
		next(error);
	}
};

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

const getParsedTeam = async (teamPokemons) => {
	let promises = teamPokemons.map((pokemon) => {
		return got(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemonId}`);
	});

	const pokemonsData = await Promise.all(promises);

	let teamTotal = 0;

	const parsedTeam = pokemonsData.map(({ body }) => {
		const parsedBody = JSON.parse(body);

		// Parse stats
		const stats = parsedBody.stats.map(({ stat, base_stat }) => {
			return {
				name: stat.name,
				value: base_stat,
			};
		});

		// Count team total
		const result = stats.reduce((sum, current) => {
			return sum + current.value;
		}, (sum = 0));
		teamTotal += result;

		return {
			id: parsedBody.id,
			name: parsedBody.name,
			sprite: parsedBody.sprites.front_default,
			stats: stats,
		};
	});

	const randomizedTeamTotal = randomizeTeamTotal(teamTotal);

	return [parsedTeam, randomizedTeamTotal];
};

const randomizeTeamTotal = (teamTotal) => {
	const rangePercentage = 10; // +-10%

	const maxRange = (teamTotal * rangePercentage) / 100;
	const minRange = -maxRange;

	const rangeRandom = Math.random() * (maxRange - minRange) + minRange;

	return Math.round(teamTotal + rangeRandom);
};

const createPlayer = (user, team, teamTotal) => ({
	_id: user._id,
	username: user.username,
	team,
	teamTotal,
});
