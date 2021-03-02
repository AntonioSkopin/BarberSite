const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("../services/authService");

exports.register = (req, res) => {
    // Creates a user object with provided data
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        points: 0,
        role: "user",
        verificationPIN: generatePin(),
        password: generateHash(req.body.password)
    });

    user.save(err => {
        // Check for any errors
        if (err) {
            res.json({
                error: err
            });
        }
    });
    res.json({
        message: "Account is gemaakt. Ga naar je mail om het te activeren!",
        data: user
    });
    sendMail(user, "activate-account");
};

exports.login = (req, res) => {
    // Search for an user with the provided email
    return User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.json({
                error: err
            });
        }
        // Check if password matches hash in database
        if (!validatePassword(req.body.password, user.password)) {
            // Invalid password
            res.json({
                message: "Onjuiste gegevens. Probeer het opnieuw!"
            });
        } else {
            // Password is matched now check if account is verified
            if (user.isActivated) {
                const accessToken = jwt.sign({ email: user.email, role: user.role }, process.env.TOKEN_SECRET); // Create token
                res.json({
                    message: "Successvol ingelogd!",
                    userID: user.id,
                    token: accessToken
                });
            } else {
                res.json({
                    message: "Je account is nog niet geactiveerd! Ga naar je mail om deze te activeren."
                });
            }
        }
    });
};

exports.activateAccount = (req, res) => {
    // Search in database for verify pin and updates following values
    const filter = { verificationPIN: req.body.verificationPIN };
    const updateValues = { isActivated: true, verificationPIN: null };
    User.findOneAndUpdate(filter, updateValues, err => {
        if (err) {
            res.json({
                err: err
            });
        }
        res.json({
            message: "Account is geactiveerd! Je kunt nu inloggen."
        });
    });
};

exports.getForgotPasswordMail = (req, res) => {
    const forgotPasswPIN = generatePin();
    const filter = { email: req.body.email };
    const updateValues = { forgotPasswordPIN: forgotPasswPIN };
    // Searches in database for row with provided email and updates the PIN
    User.findOneAndUpdate(filter, updateValues, (err, user) => {
        if (err) {
            res.json({
                err: err
            });
        }
        sendMail(user, "forgot-password");
        res.json({
            message: `Er is een mail verstuurd naar ${user.email}. Volg de stappen om je wachtwoord te resetten.`
        });
    });
};

exports.resetPassword = (req, res) => {
    const filter = { forgotPasswordPIN: req.body.forgotPasswordPIN };
    // Hashes new password
    const updateValues = { password: generateHash(req.body.password), forgotPasswordPIN: null };
    User.findOneAndUpdate(filter, updateValues, err => {
        if (err) {
            res.json({
                err: err
            });
        }
        res.json({
            message: "Wachtwoord is successvol veranderd!"
        });
    });
};