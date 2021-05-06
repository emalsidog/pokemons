// Dependencies
const router = require("express").Router();

// Controller
const Pokemons = require("../controllers/pokemons-controller");

// Middleware
const authenticate = require("../middleware/authenticate");

// GET => /pokemons
router.get("/", authenticate, Pokemons.get);

module.exports = router;