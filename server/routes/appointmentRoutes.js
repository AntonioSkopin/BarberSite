const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController");

// Set default API response
router.get("/", (req, res) => {
    res.json({
        title: "BarberAPI 2021",
        author: "Antonio Skopin"
    });
});

// Auth routes
router.route("/appointment/book-appointment")
    .post(appointmentController.bookAppointment);

router.route("/appointment/cancel-appointment")
    .post(appointmentController.cancelAppointment);

router.route("/appointment/update-appointment")
    .put(appointmentController.updateAppointment);

router.route("/appointment/appointment/:clientID")
    .get(appointmentController.getFutureAppointment);

router.route("/appointment/appointments/:clientID")
    .get(appointmentController.getAllAppointments);

// Export API routes
module.exports = router;