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
require("./routes")(app);

// Error handler
app.use(require("./middleware/error-handler"));

// Server startup
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}...`);
});
