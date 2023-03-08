const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: String,
    course_number: String,
    college_name: String,
});

module.exports = {
    Course: mongoose.model("Course", CourseSchema)
}