const axios = require("axios");
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");

async function loginController(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    return res.send();
}

module.exports = {
    loginController,
}