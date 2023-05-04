const axios = require('axios');
require("dotenv").config();
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");

async function getClubByIdController(req, res) {
    const id = req.query.id;
    if (!id) return res.status(400).send();

    try {
        const response = await axios.get(process.env.CLUB_SERVICE_HOST + `/getClubById?id=${id}`);

        if (!response || !response.data) return res.status(404).send();
        return res.json(response.data);
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

async function getClubByNameController(req, res) {
    const name = req.query.name;
    if (!name) return res.status(400).send();

    try {
        const response = await axios.get(process.env.CLUB_SERVICE_HOST + `/getClubByName?name=${name}`);

        if (!response || !response.data) return res.status(404).send();

        return res.json(response.data);
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

async function fetchAllClubsController(req, res) {
    try {
        const response = await axios.get(process.env.CLUB_SERVICE_HOST + `/getAllClubs`);

        if (!response || !response.data) return res.status(500).send();

        return res.json(response.data.clubs);
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

async function checkIfUserIsMemberOfClubController(req, res) {
    const userId = req.body.userId;
    const clubId = req.body.clubId;

    if (!userId || !clubId) return res.status(400).send();

    try {
        await axios.post(process.env.CLUB_SERVICE_HOST + "/checkUserOfMember", {
            userId, clubId
        });

        return res.json({ status: "The club exists" });
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();

    }
}

async function getEventByNameController(req, res) {
    const name = req.query.name;
    const clubId = req.query.clubId;

    if (!name || !clubId) return res.status(400).send();

    try {
        const response = await axios.get(process.env.CLUB_SERVICE_HOST + `/getEventByName?event_name=${name}&club_id=${clubId}`);

        if (!response || !response.data) return res.status(404).send();

        return res.json(response.data);
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    getClubByIdController,
    getClubByNameController,
    fetchAllClubsController,
    checkIfUserIsMemberOfClubController,
    getEventByNameController,
}