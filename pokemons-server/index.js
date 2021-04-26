// Dotenv config
require("dotenv").config();

// Dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Express app
const app = express();

// Database connection
const connectDB = require("./config/database");
connectDB();

// CORS
app.use(cors());

// Express body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Routes
app.use("/users", require("./routes/auth-routes"));
app.use("/update", require("./routes/user-update-routes"));

// Error handler
app.use(require("./middleware/error-handler"));

// Server startup
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}...`);
});
