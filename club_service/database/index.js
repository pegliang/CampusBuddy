const { initDatabase } = require("./init");
const { insertClub } = require("./insert");
const { fetchClubById, fetchClubByName } = require("./fetch");
const { deleteClubById, deleteClubByName } = require("./delete");

module.exports = {
    initDatabase,
    insertClub,
    fetchClubById,
    fetchClubByName,
    deleteClubByName,
    deleteClubById,
}