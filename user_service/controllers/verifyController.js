const { verifyEmailToken } = require("../database");

async function verifyEmailController(req, res) {
    const email = req.query.email;
    const token = req.query.token;

    if (!token || !email) return res.status(400).send();

    // if token matches what is presented in the db, then set verify email check to true
    try {
        const result = await verifyEmailToken(email, token);
        return result ? res.send({ status: "Email has been verified" }) : res.status(401).send();

    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

module.exports = {
    verifyEmailController,
}