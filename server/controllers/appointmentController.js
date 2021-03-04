const Appointment = require("../models/Appointment");
const User = require("../models/User");

exports.bookAppointment = (req, res) => {
    const appointment = new Appointment({
        clientID: req.body.clientID,
        priceID: req.body.priceID,
        date: Date.now()
    });

    // Add 10 points to user account
    const filter = { _id: appointment.clientID };
    const updateValues = { $inc: { points: 10 } };
    User.findOneAndUpdate(filter, updateValues, err => {
        if (err) {
            res.json({
                err: err
            });
        }
    });

    // Insert the appointment in to the database
    appointment.save((err, data) => {
        if (err) {
            res.json({
                err: err
            });
        }
        res.json({
            message: "Afspraak is succesvol geboekt!",
            data: data
        });
    });
};

exports.cancelAppointment = (req, res) => {
    // Search for the appointment to be deleted and delete it
    const filterAppointment = { _id: req.body._id };
    Appointment.findByIdAndRemove(filterAppointment, err => {
        if (err) {
            res.json({
                err: err
            });
        }
    });
    // Search for the user linked to the appointment and subtract 10 points from the account
    const filterUser = { _id: req.body.clientID };
    const updateValues = { $inc: { points: -10 } };
    User.findOneAndUpdate(filterUser, updateValues, err => {
        if (err) {
            res.json({
                err: err
            });
        }
        res.json({
            message: "Afspraak is vervallen."
        });
    });
};

exports.updateAppointment = (req, res) => {
    // Search for the appointment to be updated
    const filter = { _id: req.body._id };
    const updateValues = { date: req.body.date };
    Appointment.findOneAndUpdate(filter, updateValues, err => {
        if (err) {
            res.json({
                err: err
            });
        }
        res.json({
            message: "Afspraak is gewijzigd"
        });
    });
    // Sendmail to barber
};

exports.getFutureAppointment = (req, res) => {
    const filter = { clientID: req.params.clientID };
    Appointment.findOne(filter, (err, data) => {
        if (err) {
            res.json({
                err: err
            });
        }
        res.json({
            data: data
        });
    });
};


exports.getAllAppointments = (req, res) => {
    const filter = { clientID: req.params.clientID };
    Appointment.find(filter, (err, data) => {
        if (err) {
            res.json({
                err: err
            });
        }
        res.json({
            data: data
        });
    });
};
