const mongoose = require("mongoose");

/**
 * The schema for the user
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
 * @type {number} year?
 * @type {string[]} courses?
 * @type {string[]} clubs?
 * @type {string} profile_img
 * @type {string} desc?
 * @type {string[]} interests?
 */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

    college_name: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: false,
    },

    race: {
        type: String,
        required: false,
    },

    sexual_orientation: {
        type: String,
        required: false,
    },

    majors: {
        type: [String],
        required: false,
    },

    minors: {
        type: [String],
        required: false,
    },

    gpa: {
        type: Number,
        required: false,
    },

    year: {
        type: Number,
        required: false,
    },

    courses: {
        type: [String],
        required: false,
    },

    clubs: {
        type: [String],
        required: false,
    },

    profile_img: {
        type: String,
        required: false,
    },

    desc: {
        type: String,
        required: false,
    },

    interests: {
        type: [String],
        required: false,
    },

    verifiedEmail: {
        type: Boolean,
        required: true,
    },

    verifyEmailToken: {
        type: String,
        required: false,
    },

    isPremiumMember: {
        type: Boolean,
        required: true,
    }
});

module.exports = {
    User: mongoose.model("User", UserSchema)
};