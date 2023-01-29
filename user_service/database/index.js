const { initDatabase } = require("./init");
const { insertUser } = require("./insert");
const { fetchUserByEmail, fetchUserById, _fetchAllUsers } = require("./fetch");
const { deleteUserByEmail } = require("./delete");

module.exports = {
    initDatabase,
    insertUser,
    fetchUserByEmail,
    fetchUserById,
    deleteUserByEmail,
    _fetchAllUsers,
}