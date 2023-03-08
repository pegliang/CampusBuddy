const db = require("../database");

/**
 * Controller for deleting a club from the database
 * @returns 200 - OK
 * @returns 400 - No name was given
 * @returns 500 - Database error
 */
async function deleteClubByNameController(req, res) {
    const name = req.query.name;

    if (!name) return res.status(400).send();

    try {
        await db.deleteClubByName(name);
        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    deleteClubByNameController,
}