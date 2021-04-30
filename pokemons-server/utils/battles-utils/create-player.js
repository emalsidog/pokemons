const createPlayer = (user, team, teamTotal) => ({
	_id: user._id,
	username: user.username,
	team,
	teamTotal,
});

module.exports = createPlayer;