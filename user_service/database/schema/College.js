const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    zip: Number,
    telephone: {
        type: String,
        required: false,
        default: ""
    },
    county: String,
    country: String,
    latitude: Number,
    longitude: Number,
    website: {
        type: String,
        required: false,
        default: ""
    }
});

module.exports = {
    College: mongoose.model("College", CollegeSchema)
}