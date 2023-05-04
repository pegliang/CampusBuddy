const { initDatabase } = require("./init");
const { insertUser, updateUser } = require("./insert");
const { fetchUserByEmail, fetchUserById } = require("./fetch");
const { deleteUserByEmail } = require("./delete");
const { verifyEmailToken } = require("./verify");
const {getCollegeByID, importFromJSONIfNeeded, searchByCollegeName} = require("./college")
const {searchCourses, importCoursesFromJSONIfNeeded} = require("./course")

module.exports = {
    initDatabase,
    insertUser,
    fetchUserByEmail,
    fetchUserById,
    deleteUserByEmail,
    verifyEmailToken,
    getCollegeByID,
    importFromJSONIfNeeded,
    searchByCollegeName,
    searchCourses,
    importCoursesFromJSONIfNeeded,
    updateUser
}