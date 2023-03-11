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
        const club = await db.fetchClubByName(id);

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

module.exports = {
    getClubByIdController,
    getClubByNameController,
}