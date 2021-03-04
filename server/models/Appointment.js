const mongoose = require("mongoose");

// Collection schema
const appointmentSchema = mongoose.Schema({
    clientID: {
        type: String,
        required: true
    },
    priceID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Appointment = mongoose.model("appointments", appointmentSchema);
module.exports = Appointment;