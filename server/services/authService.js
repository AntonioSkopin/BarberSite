const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt-nodejs');
require("dotenv/config");

/* 
    Parameters:
        - userData: object of type User -> contains all info of user
        - typeEmail: sets type of email to be sent, either activate-account or forgot-password
*/
sendMail = (userData, typeEmail) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSW
        }
    });

    let mailOptions;

    if (typeEmail === "activate-account") {
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: userData.email,
            subject: "Activeer je account voor the Barbershop",
            html: `<h1>Welkom bij the Barbershop</h1>
                   <p>Hallo ${userData.firstname}</p>
                   <p>Jou code om je account te activeren is: <b>${userData.verificationPIN}</b>. 
                   Het enige wat je hoeft te doen is op de knop te klikken en de code in te 
                   vullen om jou account te activeren.</p>
                   <br>
                   <a href="https://www.google.com">Activeer</a>`
        };
    } else if (typeEmail === "forgot-password") {
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: userData.email,
            subject: "Wachtwoord vergeten? Reset het hier!",
            html: `<h1>Iedereen vergeet wel is zijn wachtwoord!</h1>
                   <p>Jou code om je wachtwoord te resetten is: <b>${userData.forgotPasswordPIN}</b>. 
                   Klik op de knop om je wachtwoord te resetten vervolgens voer je je code in en je nieuwe wachtwoord.</p>
                   <br>
                   <a href="https://www.google.com">Reset wachtwoord</a>`
        };
    }

    transporter.sendMail(mailOptions, (err) => {
        // Check for any errors
        if (err) {
            console.log(err);
        }
    });
}

// Hashes inputted password
generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// Checks if inputted password matches database password
validatePassword = (passwordInput, storedPassword) => {
    return bcrypt.compareSync(passwordInput, storedPassword);
}

// Generates a random 4 digit PIN code
generatePin = () => {
    return Math.floor(1000 + Math.random() * 9000);
}