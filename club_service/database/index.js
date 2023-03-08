const { initDatabase } = require("./init");
const { insertClub } = require("./insert");
const { fetchClubByName } = require("./fetch");
const { deleteClubByName } = require("./delete");

module.exports = {
    initDatabase,
    insertClub,
    fetchClubByName,
    deleteClubByName,
}