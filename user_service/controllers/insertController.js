const db = require("../database");
const { encryptPassword } = require("../encryption");

/**
 * Controller for getting attributes to create a new user into the database
 * 
 * The request must contain an attribute called registerRequest 
 * and it must be sent in a registerRequest object containing these following attributes:
 * 
 * name, email,password, college_name, gender, profile_img
 * 
 * @returns 200 success
 * @returns 400 if the registerRequest does not follow the above convention
 * @returns 409 if the user already exists
 * @returns 500 if there is a database error
 */
async function registerController(req, res) {
    if (!req.body.registerRequest) return res.status(400).send();

    const name = req.body.registerRequest.name;
    const email = req.body.registerRequest.email;
    const password = req.body.registerRequest.password;
    const college_name = req.body.registerRequest.college_name;
    const gender = req.body.registerRequest.gender || null;
    const race = req.body.registerRequest.race || null;
    const sexual_orientation = req.body.registerRequest.sexual_orientation || null;
    const majors = req.body.registerRequest.majors || [];
    const minors = req.body.registerRequest.minors || [];
    const gpa = req.body.registerRequest.gpa || null;
    const year = req.body.registerRequest.year || null;
    const courses = req.body.registerRequest.courses || [];
    const clubs = req.body.registerRequest.clubs || [];
    const profile_img = req.body.registerRequest.profile_img;
    const desc = req.body.registerRequest.desc || null;
    const interests = req.body.registerRequest.interests || [];

    // bad request if these required fields are missing
    if (!name || !email || !password || !college_name || !profile_img)
        return res.status(400).send();

    // make sure that the email is unique and not a duplicate
    const existingUser = await db.fetchUserByEmail(email);

    // return conflict if a user with the same email exits
    if (existingUser !== null) return res.status(409).send();

    // encrypt the password
    const encryptedPassword = encryptPassword(password);

    // attempt to add the user to the database
    try {
        await db.insertUser({
            name, email, password: encryptedPassword, college_name, gender, race, sexual_orientation,
            majors, minors, gpa, year, courses, clubs, profile_img, desc, interests,
        });

        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    registerController,
}