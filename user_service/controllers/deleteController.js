const db = require("../database");

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