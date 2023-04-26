const mongoose = require("mongoose");
const {College} = require("./College")

const CourseSchema = new mongoose.Schema({
    name: String,
    course_code: String,
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: College.collection.collectionName
    },
    career: String,
    subject_code: String
});

module.exports = {
    Course: mongoose.model("Course", CourseSchema)
}