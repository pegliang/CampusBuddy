const db = require("../database");

/**
 * Controller for deleting a club by id from the database using its id
 * @returns 200 - OK
 * @returns 400 - No name was given
 * @returns 500 - Database error
 */
async function deleteClubByIdController(req, res) {
    const id = req.query.id;

    if (!id) return res.status(400).send();

    try {
        await db.deleteClubById(id);
        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

/**
 * Controller for deleting a club by name from the database
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
    deleteClubByIdController,
    deleteClubByNameController,
}