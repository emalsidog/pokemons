// Express router
const router = require("express").Router();

// Controller
const User = require("../controllers/user-controllers");

// Middleware
const authenticate = require("../middleware/authenticate");

// Validation
const validateUser = require("../data-validation/user-validation");

// POST => /update-user
router.post("/update-user", authenticate, validateUser("updateUser"), User.updateUser);

module.exports = router;