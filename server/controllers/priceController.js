const Price = require("../models/Price");

exports.addPrice = (req, res) => {
    const price = new Price({
        typeCut: req.body.typeCut,
        price: req.body.price
    });

    price.save(err => {
        if (err) {
            res.json({
                err: err
            });
        }
    });

    res.json({
        message: "Nieuwe prijs is toegevoegd!"
    });
};

exports.getPriceID = (req, res) => {
    // Get type of cut from url
    const filter = { typeCut: req.params.typeCut };
    Price.findOne(filter, (err, data) => {
        if (err) {
            res.json({
                err: err
            });
        }
        res.json({
            priceID: data._id
        });
    });
}