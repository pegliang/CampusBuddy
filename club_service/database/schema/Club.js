const mongoose = require("mongoose");

/**
 * The schema for the club
 * 
 * @type {string} name
 * @type {string[]} majors
 * @type {string[]} minors
 * @type {string[]} genders?
 * @type {string[]} races?
 * @type {string[]} sexual_orientations?
 * @type {object[]} eboard_members
 * @type {object[]} members?
 * @type {string} desc
 */
const ClubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    majors: {
        type: [String],
        required: true
    },

    minors: {
        type: [String],
        required: true,
    },

    genders: {
        type: [String],
        required: false,
    },

    races: {
        type: [String],
        required: false,
    },

    sexual_orientations: {
        type: [String],
        required: false,
    },

    profile_img: {
        type: String,
        required: false,
    },

    eboard_members: {
        type: [{
            userId: String,
            name: String,
            title: String,
        }],

        required: true,
    },

    members: {
        type: [{
            userId: String,
            name: String,
        }],

        required: false,
    },

    desc: {
        type: String,
        required: false,
    },

    isVerified: {
        type: Boolean,
        required: true,
    },
});

module.exports = {
    Club: mongoose.model("Club", ClubSchema)
};