// Dependencies
const router = require("express").Router();

// Controller
const TeamPokemons = require("../controllers/team-pokemons-controller");

// Middleware 
const authenticate = require("../middleware/authenticate");

// POST => /pokemons/team/add
router.post("/add", authenticate, TeamPokemons.add);

// POST => /pokemos/team/remove
router.post("/remove", authenticate, TeamPokemons.remove);

module.exports = router;