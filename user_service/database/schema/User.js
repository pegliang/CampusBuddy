const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
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
        type: String,
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
        required: true,
    },

    desc: {
        type: String,
        required: false,
    },

    interests: {
        type: [String],
        required: false,
    }
});

module.exports = {
    User: mongoose.model("User", UserSchema)
};