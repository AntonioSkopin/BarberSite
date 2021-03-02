const mongoose = require("mongoose");

// Collection schema
const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: Number
    },
    role: {
        type: String
    },
    verificationPIN: {
        type: Number,
        unique: true
    },
    isActivated: {
        type: Boolean,
        required: true,
        default: false
    },
    forgotPasswordPIN: {
        type: Number,
        unique: true,
        default: null
    }
});

const User = mongoose.model('users', userSchema);
module.exports = User;