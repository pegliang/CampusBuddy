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
    const eboard_members = [req.body.eboard_members];
    const members = [];
    const desc = req.body.desc;

    if (!name || !majors || !minors || !desc || !eboard_members) return res.status(400).send();

    // make sure eboard members are parse correctly
    if (!eboard_members || !eboard_members[0].userId || !eboard_members[0].name || !eboard_members[0].title)
        return res.status(400).send();

    try {
        // make sure the club dne
        const club = await db.fetchClubByName(name);
        if (club) return res.status(409).send();

        await db.insertClub({
            name, majors, minors, genders, races,
            sexual_orientations, eboard_members, members, desc
        });

        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }

}

module.exports = {
    registerController,
}