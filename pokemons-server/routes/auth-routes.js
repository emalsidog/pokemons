// Express router
const router = require("express").Router();

// Controller
const Auth = require("../controllers/auth-controllers");

// Middleware
const authenticate = require("../middleware/authenticate");

// Validation
const validateAuth = require("../data-validation/auth-validation");

// POST => /users/register
router.post("/register", validateAuth("register"), Auth.register);

// POST => /users/activate
router.post("/activate", Auth.activate);

// POST => /users/login
router.post("/login", validateAuth("login"), Auth.login);

// POST => /users/forgot
router.post("/forgot", validateAuth("forgot"), Auth.forgot);

// POST => /users/reset
router.post("/reset", validateAuth("reset"), Auth.reset);

// GET => /users/current-user
router.get("/current-user", authenticate, Auth.getCurrentUser);

module.exports = router;