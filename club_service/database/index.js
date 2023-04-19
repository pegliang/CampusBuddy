const { initDatabase } = require("./init");
const { insertClub, joinClub, createEvent } = require("./insert");
const { fetchClubById, fetchClubByName, fetchAllClubs, checkIfUserIsMemberOfClub } = require("./fetch");
const { deleteClubById, deleteClubByName, leaveClub } = require("./delete");

module.exports = {
    initDatabase,
    insertClub,
    createEvent,
    joinClub,
    fetchClubById,
    fetchClubByName,
    fetchAllClubs,
    checkIfUserIsMemberOfClub,
    deleteClubByName,
    deleteClubById,
    leaveClub,
}