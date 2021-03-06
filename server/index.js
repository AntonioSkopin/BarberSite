const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const priceRoutes = require("./routes/priceRoutes");
const dbConnection = require("./database/dbConnection");
require("dotenv/config");
const port = process.env.PORT;

// Middleware
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use("/api", authRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", priceRoutes);

dbConnection.connectToDatabase();

// Launch app to specified port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});