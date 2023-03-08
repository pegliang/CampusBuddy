const axios = require("axios");
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");
require("dotenv").config();

/**
 * Gateway handler for fetching user by email
 * 
 * please see the documentation for user service fetch controller for all possible status codes  
 */
async function fetchUserByEmailController(req, res) {
    const email = req.query.email;

    if (!email) return res.status(400).send();

    try {
        const response = await axios.get(process.env.USER_SERVICE_HOST + `/getUserAccountInfoByEmail?email=${email}`);

        // no user returned
        if (!response.data) return res.status(500).send();

        return res.json(response.data);

    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

/**
 * Gateway handler for fetching user by id
 * 
 * please see the documentation for user service fetch controller for all possible status codes  
 */
async function fetchUserByIdController(req, res) {
    const id = req.query.id;

    if (!id) return res.status(400).send();

    try {
        const response = await axios.get(process.env.USER_SERVICE_HOST + `/getUserAccountInfoById?id=${id}`);

        // no user returned
        if (!response.data) return res.status(500).send();

        return res.json(response.data);

    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}


module.exports = {
    fetchUserByEmailController,
    fetchUserByIdController,
}