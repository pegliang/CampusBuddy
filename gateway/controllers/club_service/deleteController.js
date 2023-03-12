const axios = require('axios');
const findEboardMember = require('../utils/findEboardMember');
require("dotenv").config();
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");

async function deleteClubByIdController(req, res) {
    const clubId = req.body.clubId;
    const userId = req.body.userId;

    if (!userId || !clubId) return res.status(400).send();

    try {
        // get the club from the database
        const response = await axios.get(process.env.CLUB_SERVICE_HOST + `/getClubById?id=${clubId}`);

        const club = response.data;

        // the user is not the owner of the club
        if (!findEboardMember(club.eboard_members, userId, "president")) return res.status(401).send();

        await axios.delete(process.env.CLUB_SERVICE_HOST + `/deleteClubById?id=${clubId}`);

        return res.send();
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    deleteClubByIdController,
}