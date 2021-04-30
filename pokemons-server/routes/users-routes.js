// Dependenices
const router = require("express").Router();

// Controllers
const Users = require("../controllers/users-controller");

// Middleware
const authenticate = require("../middleware/authenticate");

// GET => /users
router.get("/", authenticate, Users.getUsers);

module.exports = router;