// Models
const User = require("../models/User");

// Utils
const ErrorResponse = require("../utils/error-response");

exports.getUsers = async (req, res, next) => {
    try {
        const dbUsers = await User.find({});
        
        const users = dbUsers.map(user => {
            return {
                username: user.username,
                teamPokemons: user.teamPokemons
            }
        })

        res.status(200).json({
            status: {
                message: "Done.",
                isError: false
            },
            body: {
                users
            }
        })
    } catch (error) {
        next(error);
    }
}