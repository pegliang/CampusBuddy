const { initDatabase } = require("./init");
const { insertClub } = require("./insert");
const { fetchClubByName } = require("./fetch");


module.exports = {
    initDatabase,
    insertClub,
    fetchClubByName,
}