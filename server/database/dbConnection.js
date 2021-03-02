const mongoose = require("mongoose");
require("dotenv/config");

exports.connectToDatabase = () => {
    // Connect to database
    const dbPath = process.env.CONNECTION_STRING;
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose.connect(dbPath, options).then(() => {
        console.log("Connected to the database!");
    }, err => {
        console.log("Database connection error: ", err);
    });
};