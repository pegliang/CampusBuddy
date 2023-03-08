const axios = require("axios");
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");
require("dotenv").config();

/**
 * Gateway login controller for handling user login requests
 * 
 * @type {string} email
 * @type {string} password
 * 
 * @response refreshToken - Http only cookie
 * @response user info + accessToken
 *
 * please see the documentation for user service login controller for all possible status codes  
 */
async function loginController(req, res) {
    const email = req.body?.email;
    const password = req.body?.password;

    try {
        const response = await axios.post(process.env.USER_SERVICE_HOST + "/login", {
            email, password
        });

        const user = response.data;
        if (!user || !user.accessToken || !user.refreshToken) return res.status(500).send();

        // send the refresh token to a http only cookie
        res.cookie("refreshToken", user.refreshToken, { httpOnly: true });

        // add the refresh token to cache
        await axios.put(process.env.AUTH_SERVICE_HOST + "/addRefreshToken", { id: user.id, refreshToken: user.refreshToken });

        // send the user info back 
        return res.send({
            ...user,
            refreshToken: process.env.NODE_ENV !== 'production' ? user.refreshToken : undefined
        });

    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    loginController,
}