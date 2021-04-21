// Express router
const router = require("express").Router();

// Controller
const Auth = require("../controllers/auth-controllers");

// Validation
const validate = require("../utils/validation");

// POST => /users/register
router.post("/register", validate("register"), Auth.register);

// POST => /users/activate
router.post("/activate", Auth.activate);

// POST => /users/login
router.post("/login", validate("login"), Auth.login);

// POST => /users/forgot
router.post("/forgot", validate("forgot"), Auth.forgot);

// POST => /users/reset
router.post("/reset", validate("reset"), Auth.reset);

module.exports = router;