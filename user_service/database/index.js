const { initDatabase } = require("./init");
const { insertUser } = require("./insert");
const { fetchUserByEmail, fetchUserById } = require("./fetch");
const { deleteUserByEmail } = require("./delete");
const { verifyEmailToken } = require("./verify");
const {getCollegeByID, importFromJSONIfNeeded, searchByCollegeName} = require("./college")


module.exports = {
    initDatabase,
    insertUser,
    fetchUserByEmail,
    fetchUserById,
    deleteUserByEmail,
    verifyEmailToken,
    getCollegeByID,
    importFromJSONIfNeeded,
    searchByCollegeName
}