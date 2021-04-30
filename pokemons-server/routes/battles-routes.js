// Dependenices
const router = require("express").Router();

// Controllers
const Battles = require("../controllers/battles-controller");

// Middleware
const authenticate = require("../middleware/authenticate");

// GET => /battles/battle
router.get("/battle", authenticate, Battles.battle);

// GET => /battles/battles
router.get("/battles", authenticate, Battles.getUserBattles);

module.exports = router;