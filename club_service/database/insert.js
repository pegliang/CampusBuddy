const { Club } = require("./schema/Club");

/**
 * Add a new club to the user database
 * 
 * NOTE: This method DOES NOT check for duplicates, make sure you check if the club does not already exists before calling this method
 * 
 * NOTE: This method DOES NOT check for the validity of the request object, make sure you check the request object is valid before calling this method
 * 
 * @param {object} registerRequest 
 * @throw {Error} database error
 */
async function insertClub(registerRequest) {
    const name = registerRequest.name;
    const majors = registerRequest.majors;
    const minors = registerRequest.minors;
    const genders = registerRequest.genders;
    const races = registerRequest.races;
    const sexual_orientations = registerRequest.sexual_orientations;
    const eboard_members = registerRequest.eboard_members;
    const members = registerRequest.members;
    const desc = registerRequest.desc;

    try {
        await Club.create({
            name, majors, minors, genders, races,
            sexual_orientations, eboard_members, members, desc,
            isVerified: false,
        });
    } catch (err) {
        throw err;
    }

}

/**
 * Allow the user to join a club
 * @param {string} clubId 
 * @param {string} userId 
 * @param {string} username 
 */
async function joinClub(clubId, userId, username) {
    try {
        const club = await Club.findById(clubId);
        if (club === null) throw new Error("Cannot find the club");

        club.members.append({
            userId,
            name: username,
        });

        await club.save();
    } catch (err) {
        throw err;
    }
}

/**
 * Create a new event for a club
 * @param {string} clubId 
 * @param {string} eventObj 
 */
async function createEvent(clubId, eventObj) {
    try {
        const club = await Club.findById(clubId);
        if (club === null) throw new Error("Cannot find the club");

        club.events.append({
            name: eventObj.name,
            desc: eventObj.desc,
            startDate: new Date(eventObj.startDate),
            endDate: new Date(eventObj.endDate),
        });

        await club.save();
    } catch (err) {
        throw err;
    }
}

module.exports = {
    insertClub,
    joinClub,
    createEvent,
}