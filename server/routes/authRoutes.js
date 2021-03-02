const router = require("express").Router();
const authController = require("../controllers/authController");

// Set default API response
router.get("/", (req, res) => {
    res.json({
        title: "BarberAPI 2021",
        author: "Antonio Skopin"
    });
});

// Auth routes
router.route("/auth/register")
    .post(authController.register);

router.route("/auth/login")
    .post(authController.login);

router.route("/auth/activate-account")
    .put(authController.activateAccount);

router.route("/auth/forgot-password")
    .put(authController.getForgotPasswordMail);

router.route("/auth/reset-password")
    .put(authController.resetPassword);

// Export API routes
module.exports = router;