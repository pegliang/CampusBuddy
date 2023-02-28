const axios = require("axios");
require("dotenv").config();
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");

async function logoutController(req, res, next) {
    const email = req.body.email;

    if (!email) return res.status(400).send();

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).send();
    }

    const line = authHeader.split(" ");

    // no auth token provided
    if (line.length < 2 || line[0] !== 'Bearer') {
        return res.status(401).send();
    }

    // get current refresh token
    // during testing, refresh token will be in the header
    const refreshToken = req.headers.refreshtoken;

    try {
        // get userId
        const response = await axios.get(process.env.USER_SERVICE_HOST + `/getUserAccountInfoByEmail?email=${email}`);
        const userId = response.data?.id;

        await axios.post(process.env.AUTH_SERVICE_HOST + "/removeRefreshToken", {
            id: userId,
            refreshToken,
        });

        return res.send();
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    logoutController,
}