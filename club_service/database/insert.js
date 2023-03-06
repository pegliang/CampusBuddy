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

module.exports = {
    insertClub,
}