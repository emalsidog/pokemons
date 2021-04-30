const randomizeTeamTotal = (teamTotal) => {
	const rangePercentage = 10; // +-10%

	const maxRange = (teamTotal * rangePercentage) / 100;
	const minRange = -maxRange;

	const rangeRandom = Math.random() * (maxRange - minRange) + minRange;

	return Math.round(teamTotal + rangeRandom);
};

module.exports = randomizeTeamTotal;