const db = require("../database");
const encryption = require("../encryption");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Handles login 
 * 
 * @returns 200 - user has logged in successfully
 * @returns 400 - request object is invalid
 * @returns 404 - user not found in database
 * @returns 401 - entered password does not match
 * @returns 500 - database error 
 */
async function loginController(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) return res.status(400).send();

    try {
        // make sure that the user exists
        const user = await db.fetchUserByEmail(email);

        if (!user) return res.status(404).send();

        // password not correct
        if (!encryption.verifyPassword(user.password, password)) return res.status(401).send();

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        // sign jwt access token and refresh token
        // access token lasts 5 min
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS_TOKEN_KEY, { expiresIn: "15s" });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH_TOKEN_KEY, { expiresIn: "30s" });

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
            isPremiumMember: user.isPremiumMember,
            accessToken,
            refreshToken,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    loginController,
}