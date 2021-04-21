// Dependencies
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Database is successfully connected.");
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB;