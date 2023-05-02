const axios = require('axios');
require("dotenv").config();
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");


async function registerController(req, res) {
    // params to create the first eboard member
    const userId = req.body.userId;
    const username = req.body.username;
    const title = req.body.title;

    // club information
    const clubName = req.body.clubName;
    const majors = req.body.majors;
    const minors = req.body.minors;
    const genders = req.body.genders || [];
    const races = req.body.races || [];
    const sexual_orientations = req.body.sexual_orientations || [];
    const desc = req.body.desc;

    if (!userId || !username || !title) return res.status(400).send();
    if (!clubName || !majors || !minors || !desc) return res.status(400).send();

    try {
        await axios.post(process.env.CLUB_SERVICE_HOST + "/register", {
            name: clubName,
            majors, minors, genders, races, sexual_orientations, desc,
            eboard_member: {
                userId, name: username, title
            }
        });

        return res.send();
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

async function joinClubController(req, res) {
    const userId = req.body.userId;
    const username = req.body.username;
    const clubId = req.body.clubId;

    if (!userId || !username || !clubId) return res.status(400).send();

    try {
        await axios.post(process.env.CLUB_SERVICE_HOST + "/joinClub", {
            userId, username, clubId
        });

        return res.send();
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

async function createEventController(req, res) {
    const name = req.body.name;
    const desc = req.body.desc;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const clubId = req.body.clubId;

    if (!name || !desc || !startDate || !endDate || !clubId) return res.status(400).send();

    try {
        await axios.post(process.env.CLUB_SERVICE_HOST + "/createEvent", {
            name, desc, startDate, endDate, clubId
        });

        return res.send();
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

async function rsvpEventController(req, res) {
    const clubId = req.body.clubId;
    const userId = req.body.userId;
    const eventId = req.body.eventId;

    if (!clubId || !userId || !eventId) return res.status(400).send();

    try {
        await axios.post(process.env.CLUB_SERVICE_HOST + "/rsvpEvent", {
            clubId, userId, eventId
        });

        return res.send();
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    registerController,
    joinClubController,
    createEventController,
    rsvpEventController,
}