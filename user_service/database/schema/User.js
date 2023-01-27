const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    usernames: String,
});

module.exports = {
    User: mongoose.model("User", UserSchema)
};