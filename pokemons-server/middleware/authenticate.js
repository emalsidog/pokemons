// Dependencies
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");

// Utils
const ErrorResponse = require("../utils/error-response");

const authenticate = async (req, res, next) => {

    // Parse token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorResponse("Unauthorized.", 401))
    }

    try {
        const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(id);
        if (!user) {
            return next(new ErrorResponse("Account does not exist.", 401))
        }
        
        req.user = user;
        next()
    } catch (error) {
        return next(new ErrorResponse("Unauthorized.", 401))
    }
}

module.exports = authenticate;