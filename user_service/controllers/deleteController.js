const db = require("../database");

/**
 * Delete a user from the database using their email
 * 
 * @returns 200 - user has been deleted successfully
 * @returns 400 - no email was provided
 * @returns 500 - database error 
 */
async function deleteUserByEmailController(req, res) {
    const email = req.query.email;

    if (!email) return res.status(400).send();

    try {
        await db.deleteUserByEmail(email);
        return res.send();

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    deleteUserByEmailController,
}