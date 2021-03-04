const router = require("express").Router();
const priceController = require("../controllers/priceController");

// Set default API response
router.get("/", (req, res) => {
    res.json({
        title: "BarberAPI 2021",
        author: "Antonio Skopin"
    });
});

// Price routes
router.route("/price")
    .post(priceController.addPrice);

router.route("/price/:typeCut")
    .get(priceController.getPriceID);

// Export API routes
module.exports = router;