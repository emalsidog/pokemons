// Express router
const router = require("express").Router();

// Controller
const User = require("../controllers/user-controllers");

// Middleware
const authenticate = require("../middleware/authenticate");

// Validation
const validateUser = require("../data-validation/user-validation");

// POST => /update/name
router.post("/name", authenticate, validateUser("updateName"), User.updateName);

// POST => /update/email
router.post("/email", authenticate, validateUser("updateEmail"), User.updateEmail);

// POST => /update/username
router.post("/username", authenticate, validateUser("updateUsername"), User.updateUsername);

// POST => /update/phone
router.post("/phone", authenticate, validateUser("updatePhone"), User.updatePhone);

module.exports = router;