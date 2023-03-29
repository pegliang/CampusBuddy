const { User } = require("./schema/User");
const crypto = require("crypto");

/**
 * Add a new user to the user database
 * 
 * NOTE: This method DOES NOT check for duplicates, make sure you check if the user does not already exists before calling this method
 * 
 * NOTE: This method DOES NOT check for the validity of the request object, make sure you check the request object is valid before calling this method
 * 
 * @param {object} registerRequest 
 * @throw {Error} database error
 */
async function insertUser(registerRequest) {
    const name = registerRequest.name;
    const email = registerRequest.email;
    const password = registerRequest.password;
    const college_name = registerRequest.college_name;
    const gender = registerRequest.gender;
    const race = registerRequest.race;
    const sexual_orientation = registerRequest.sexual_orientation;
    const majors = registerRequest.majors;
    const minors = registerRequest.minors;
    const gpa = registerRequest.gpa;
    const year = registerRequest.year;
    const courses = registerRequest.courses;
    const clubs = registerRequest.clubs;
    const profile_img = registerRequest.profile_img;
    const desc = registerRequest.desc;
    const interests = registerRequest.interests;

    try {
        await User.create({
            name, email, password, college_name, gender, race, sexual_orientation, majors, minors,
            gpa, year, courses, clubs, profile_img, desc, interests,
            verifiedEmail: false,
            verifyEmailToken: crypto.randomBytes(10).toString("hex"),
            isPremiumMember: false,
        });

    } catch (err) {
        throw err;
    }

}

module.exports = {
    insertUser,
}