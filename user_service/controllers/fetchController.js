const db = require("../database");

/**
 * Fetch a user information from the database using their email
 * 
 * @throws {Error} Database error
 * @returns 200 - the user information as a json object
 * @returns 400 email address not provided
 * @returns 404 the user does not exist
 * @returns 500 database error
 */
async function fetchUserByEmailController(req, res) {
    const email = req.query.email;

    if (!email) return res.status(400).send();

    try {
        const user = await db.fetchUserByEmail(email);

        if (!user) return res.status(404).send();

        return res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            college_name: user.college_name,
            gender: user.gender,
            race: user.race,
            sexual_orientation: user.sexual_orientation,
            majors: user.majors,
            minors: user.minors,
            gpa: user.gpa,
            year: user.year,
            courses: user.courses,
            clubs: user.clubs,
            profile_img: user.profile_img,
            desc: user.desc,
            interests: user.interests,
            verifiedEmail: user.verifiedEmail,
            verifyEmailToken: user.verifyEmailToken,
            isPremiumMember: user.isPremiumMember
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

/**
 * Fetch a user information from the database using their id
 * 
 * @throws {Error} Database error
 * @returns 200 - the user information as a json object
 * @returns 400 email address not provided
 * @returns 404 the user does not exist
 * @returns 500 database error
 */
async function fetchUserByIdController(req, res) {
    const id = req.query.id;

    if (!id) return res.status(400).send();

    try {
        const user = await db.fetchUserById(id);

        if (!user) return res.status(404).send();

        return res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            college_name: user.college_name,
            gender: user.gender,
            race: user.race,
            sexual_orientation: user.sexual_orientation,
            majors: user.majors,
            minors: user.minors,
            gpa: user.gpa,
            year: user.year,
            courses: user.courses,
            clubs: user.clubs,
            profile_img: user.profile_img,
            desc: user.desc,
            interests: user.interests,
            verifiedEmail: user.verifiedEmail,
            isPremiumMember: user.isPremiumMember
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    fetchUserByEmailController,
    fetchUserByIdController,
}