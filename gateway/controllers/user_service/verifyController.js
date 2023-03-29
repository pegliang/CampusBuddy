const axios = require('axios');
require("dotenv").config();
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");

async function verifyEmailController(req, res) {
    const email = req.query.email;
    const token = req.query.token;

    if (!token || !email) return res.status(400).send();

    // if token matches what is presented in the db, then set verify email check to true
    try {
        await axios.get(process.env.USER_SERVICE_HOST + `/verifyEmail?email=${email}&token=${token}`);
        return res.json({ status: "Email has been verified" });

    } catch (err) {
        console.log(err);
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    verifyEmailController,
}