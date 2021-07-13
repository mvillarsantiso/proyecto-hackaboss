'use strict';
const nodemailer = require('nodemailer');

const {
    SENDER_EMAIL,
    RECEIVER_EMAIL,
    PASSWORD
} = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SENDER_EMAIL,
        pass: PASSWORD
    }
});


async function sendEmail(req, res) {
    try {
        var mailOptions = {
            from: SENDER_EMAIL,
            to: RECEIVER_EMAIL,
            subject: 'Contact Email',
            html: `<h1>${req.body.name}</h1><h3>${req.body.email}</h3><p>${req.body.message}</p>`
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(error.status || 500);
                res.json({ error: error.message, credential: `${EMAIL} + ${PASSWORD}` });
            } else {
                res.status(200);
                res.json({ message: `Thank You !` });
            }
        });

    } catch (err) {
        res.status(err.status || 500);
        res.json({ err: err.message });
    }
}

module.exports = {
    sendEmail,
}