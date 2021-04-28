// Dependenices
const router = require("express").Router();

// Controllers
const Users = require("../controllers/users-controllers");

// Middleware
const authenticate = require("../middleware/authenticate");

// GET => /users
router.get("/", Users.getUsers);

module.exports = router;