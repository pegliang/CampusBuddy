
async function deleteUserByEmailController(req, res) {
    const email = req.query.email;

    return res.send(email)
}

module.exports = {
    deleteUserByEmailController,
}