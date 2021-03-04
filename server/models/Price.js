const mongoose = require("mongoose");

// Collection schema
const priceSchema = mongoose.Schema({
    typeCut: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

const Price = mongoose.model("prices", priceSchema);
module.exports = Price;