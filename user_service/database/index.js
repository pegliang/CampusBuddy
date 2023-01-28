const { initDatabase } = require("./init");
const { insertUser } = require("./insert");
const { fetchUserByEmail, _fetchAllUsers } = require("./fetch");
const { deleteUserByEmail } = require("./delete");

module.exports = {
    initDatabase,
    insertUser,
    fetchUserByEmail,
    deleteUserByEmail,
    _fetchAllUsers,
}