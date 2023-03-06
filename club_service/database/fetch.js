const { Club } = require("./schema/Club");

/**
 * Fetch a club by its name
 * @param {string} name 
 * @returns the information about the club, null otherwise
 */
async function fetchClubByName(name) {
    try {
        const club = await Club.findOne({ name: name });
        return club === null ? null : club;

    } catch (err) {
        throw err;
    }
}

module.exports = {
    fetchClubByName,
}