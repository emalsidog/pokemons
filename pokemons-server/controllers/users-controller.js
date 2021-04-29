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

exports.battle = async (req, res, next) => {
	try {
		let randomArray = await User.aggregate([
			{
				$match: {
					_id: { $ne: req.user._id },
					warParticipant: { $ne: false },
				},
			},
			{ $sample: { size: 1 } },
		]).exec();
		const randomUser = randomArray[0];
		
		const [opponentTeam, opponentTeamTotal] = await getParsedTeam(
			randomUser.teamPokemons
		);
		const [currentUserTeam, currentUserTeamTotal] = await getParsedTeam(
			req.user.teamPokemons
		);

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

		const winPoints = 10;
		const tiePoints = 5;
			
		if (currentUser.teamTotal > opponent.teamTotal) {
			req.user.warPoints += winPoints;

			const battle = new Battle({
				winner: currentUser._id,
				loser: opponent._id,
				result: "hasWinner",
			});

			await req.user.save();
			await battle.save();

			res.status(200).json({
				currentUserTeamTotal,
				opponentTeamTotal,
				winner: currentUser,
				loser: opponent,
			});
		} else if (currentUser.teamTotal < opponent.teamTotal) {
			randomUser.warPoints += winPoints;

			const battle = new Battle({
				winner: opponent._id,
				loser: currentUser._id,
				result: "hasWinner",
			});

			await randomUser.save();
			await battle.save();

			res.status(200).json({
				currentUserTeamTotal,
				opponentTeamTotal,
				winner: opponent,
				loser: currentUser,
			});
		} else if (currentUser.teamTotal === opponent.teamTotal) {
			randomUser.warPoints += tiePoints;
			req.user.warPoints += tiePoints;

			const battle = new Battle({
				winner: opponent._id,
				loser: currentUser._id,
				result: "tie",
			});

			await randomUser.save();
			await req.user.save();
			await battle.save();

			res.status(200).json({
				currentUserTeamTotal,
				opponentTeamTotal,
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
