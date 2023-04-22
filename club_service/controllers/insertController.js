const db = require("../database");

/**
 * Controller to insert a new club into the database
 *  
 * @returns 200 - OK
 * @returns 400 - Some required fields are not given
 * @returns 409 - A club with the same name already exists
 * @returns 500 - Database error 
 */
async function registerController(req, res) {
    const name = req.body.name;
    const majors = req.body.majors;
    const minors = req.body.minors;
    const genders = req.body.genders || [];
    const races = req.body.races || [];
    const sexual_orientations = req.body.sexual_orientations || [];
    const eboard_member = req.body.eboard_member;
    const members = [];
    const desc = req.body.desc;

    if (!name || !majors || !minors || !desc || !eboard_member) return res.status(400).send();

    // make sure eboard members are parse correctly
    if (!eboard_member.userId || !eboard_member.name || !eboard_member.title)
        return res.status(400).send();

    try {
        // make sure the club dne
        const club = await db.fetchClubByName(name);
        if (club) return res.status(409).send();

        await db.insertClub({
            name, majors, minors, genders, races,
            sexual_orientations, members, desc,
            eboard_members: [{
                userId: eboard_member.userId,
                name: eboard_member.name,
                title: eboard_member.title,
            }],
        });

        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }

}

async function joinClubController(req, res) {
    const userId = req.body.userId;
    const username = req.body.username;
    const clubId = req.body.clubId;

    if (!userId || !username || !clubId) return res.status(400).send();

    try {
        await db.joinClub(clubId, userId, username);

        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

async function createEventController(req, res) {
    const name = req.body.name;
    const desc = req.body.desc;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const clubId = req.body.clubId;

    if (!name || !desc || !startDate || !endDate || !clubId) return res.status(400).send();

    // validate the start and end date
    const startDate_d = new Date(startDate);
    const endDate_d = new Date(endDate);

    if (startDate_d.toString().toLowerCase() === 'invalid date' ||
        endDate_d.toString().toLowerCase() === 'invalid date' ||
        startDate_d > endDate_d) {
        return res.status(400).send({ status: "Invalid Dates" });
    }

    try {
        await db.createEvent(clubId, {
            name, desc, startDate, endDate
        });

        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

async function rsvpEventController(req, res) {
    const clubId = req.body.clubId;
    const userId = req.body.userId;
    const eventId = req.body.eventId;

    if (!clubId || !userId || !eventId) return res.status(400).send();

    try {
        await db.rsvpEvent(clubId, eventId, userId);
        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    registerController,
    joinClubController,
    createEventController,
    rsvpEventController,
}