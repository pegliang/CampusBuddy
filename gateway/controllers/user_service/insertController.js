const axios = require('axios');
require("dotenv").config();
const getHTTPErrorCode = require('../utils/getHTTPErrorCode');

/**
 * Gateway register controller for handling registration requests
 * 
 * @type {string} name
 * @type {string} email
 * @type {string} password
 * @type {string} college_name
 * @type {string} gender?
 * @type {string} race?
 * @type {string} sexual_orientation?
 * @type {string[]} majors?
 * @type {string[]} minors?
 * @type {number} gpa?
 * @type {string} year?
 * @type {string[]} courses?
 * @type {string[]} clubs?
 * @type {string} profile_img
 * @type {string} desc?
 * @type {object[]} interests?
 * 
 * please see the documentation for user service register controller for all possible status codes 
 */
async function registerController(req, res) {
    const name = req.body?.name;
    const email = req.body?.email;
    const password = req.body?.password;
    const college_name = req.body?.college_name;
    const gender = req.body?.gender || null;
    const race = req.body?.race || null;
    const sexual_orientation = req.body?.sexual_orientation || null;
    const majors = req.body?.majors || [];
    const minors = req.body?.minors || [];
    const gpa = req.body?.gpa || null;
    const year = req.body?.year || null;
    const courses = req.body?.courses || [];
    const clubs = req.body?.clubs || [];
    const profile_img = req.body?.profile_img;
    const desc = req.body?.desc || null;
    const interests = req.body?.interests || [];

    try {
        await axios.post(process.env.USER_SERVICE_HOST + "/register", {
            registerRequest: {
                name, email, password, college_name, gender, race, sexual_orientation,
                majors, minors, gpa, year, courses, clubs, profile_img, desc, interests,
            }
        });

        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    registerController,
}