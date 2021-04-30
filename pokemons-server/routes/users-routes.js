// Dependenices
const router = require("express").Router();

// Controllers
const Users = require("../controllers/users-controller");

// Middleware
const authenticate = require("../middleware/authenticate");

// GET => /users
router.get("/", authenticate, Users.getUsers);

// GET => /users/battle
router.get("/battle", authenticate, Users.battle);

// GET => /users/battles
router.get("/battles", authenticate, Users.getUserBattles);

module.exports = router;