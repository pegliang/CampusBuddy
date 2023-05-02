const { Club } = require("./schema/Club");

async function fetchClubById(id) {
    try {
        const club = await Club.findById(id);
        return club;
    } catch (err) {
        throw err;
    }
}

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

/**
 * Fetch all the clubs in the database
 * @returns an array of clubs, empty array otherwise
 */
async function fetchAllClubs() {
    try {
        const club = await Club.find();
        return club;
    } catch (err) {
        throw err;
    }
}

/**
 * Check if a user is a member of a club
 * @param {string} clubId
 * @param {string} userId 
 * @returns true if the user is a member, false otherwise
 */
async function checkIfUserIsMemberOfClub(clubId, userId) {
    try {
        const club = await Club.findById(clubId);
        if (club === null) throw new Error("Cannot find club");

        for (const user of club.members) {
            if (user.userId === userId) {
                return true;
            }
        }

        return false;
    } catch (err) {
        throw err;
    }
}


async function fetchEventByName(clubId, eventName) {
    try {
        const club = await Club.findById(clubId);
        if (club === null) throw new Error("Cannot find club");

        for (const event of club.events) {
            if (event.name === eventName) return event;
        }

        return null;
    } catch (err) {
        throw err;
    }
}
module.exports = {
    fetchClubById,
    fetchClubByName,
    fetchAllClubs,
    fetchEventByName,
    checkIfUserIsMemberOfClub,
}