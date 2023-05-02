const db = require("../database");

/**
 * Controller for getting a club's information by id
 *  
 * @returns 200 - OK and json response of the specified club information
 * @returns 400 - No name was given
 * @returns 404 - Club does not exist
 * @returns 500 - Database error
 */
async function getClubByIdController(req, res) {
    const id = req.query.id;

    if (!id) return res.status(400).send();

    try {
        const club = await db.fetchClubById(id);

        if (!club) return res.status(404).send();

        return res.json(club);
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

/**
 * Controller for getting a club's information by name
 *  
 * @returns 200 - OK and json response of the specified club information
 * @returns 400 - No name was given
 * @returns 404 - Club does not exist
 * @returns 500 - Database error
 */
async function getClubByNameController(req, res) {
    const name = req.query.name;

    if (!name) return res.status(400).send();

    try {
        const club = await db.fetchClubByName(name);

        if (!club) return res.status(404).send();

        return res.json(club);
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

async function fetchAllClubsController(req, res) {
    try {
        const clubs = await db.fetchAllClubs();

        return res.json({ clubs });
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

async function checkIfUserIsMemberOfClubController(req, res) {
    const userId = req.body.userId;
    const clubId = req.body.clubId;

    if (!userId || !clubId) return res.status(400).send();

    try {
        const exist = await db.checkIfUserIsMemberOfClub(clubId, userId);

        return exist ? res.send() : res.status(404).send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

async function getEventByNameController(req, res) {
    const name = req.query.event_name;
    const clubId = req.query.club_id;

    if (!name || !clubId) return res.status(400).send();

    try {
        const event = await db.fetchEventByName(clubId, name);
        if (event === null) return res.status(404).send();

        return res.json(event);
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }

}

module.exports = {
    getClubByIdController,
    getClubByNameController,
    fetchAllClubsController,
    checkIfUserIsMemberOfClubController,
    getEventByNameController,
}