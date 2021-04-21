// Express router
const router = require("express").Router();

// Middleware
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, (req, res) => {
    console.log(req.user);
    res.json({ msg: "Wow. Its a private route!" })
})

module.exports = router;