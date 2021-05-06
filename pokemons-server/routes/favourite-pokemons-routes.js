// Dependencies
const router = require("express").Router();

// Controller
const FavouritePokemons = require("../controllers/favourite-pokemons-controller");

// Middleware
const authenticate = require("../middleware/authenticate");

// GET => /pokemons/favourite
router.get("/", authenticate, FavouritePokemons.get);

// POST => /pokemons/favourite/add
router.post("/add", authenticate, FavouritePokemons.add);

// POST => /pokemons/favourite/remove
router.post("/remove", authenticate, FavouritePokemons.remove);

module.exports = router;