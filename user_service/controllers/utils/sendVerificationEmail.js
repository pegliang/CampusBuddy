const nodemailer = require("nodemailer");
require("dotenv").config();
const { fetchUserByEmail } = require("../../database");

/**
 * Send the verification email to the specified recipient
 * @param {string} email the recipient's email address 
 */
async function sendVerificationEmail(email) {
    try {
        const user = await fetchUserByEmail(email);
        if (!user) throw new Error("Cannot find user");

        const token = user.verifyEmailToken;

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_SENDER_PASSWORD,
            }
        });

        const gatewayHost = process.env.NODE_ENV !== 'production' ? `http://localhost:${process.env.GATEWAY_PORT}` : process.env.GATEWAY_HOST;

        const verifyTokenURL = `${gatewayHost}/user/verifyEmail?email=${email}&token=${token}`;

        const mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: email,
            subject: "Campus Buddy Email Verification",
            html: `Click here to verify your email: ${verifyTokenURL}`
        }

        await transporter.sendMail(mailOptions);

    } catch (err) {
        throw err;
    }
}

module.exports = sendVerificationEmail;
