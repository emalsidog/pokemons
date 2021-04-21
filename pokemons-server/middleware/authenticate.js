// Dependencies
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");

// Utils
const response = require("../utils/response");

const authenticate = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return response(res, 401, "Unauthorized.", true);
    }

    try {
        const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(id);
        if (!user) {
            return response(res, 400, "Account does not exist.", true);    
        }
        
        req.user = user;
        next()
    } catch (error) {
        return response(res, 401, "Unauthorized", true);
    }
}

module.exports = authenticate;