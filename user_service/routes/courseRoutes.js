const express = require('express');
const router = express.Router();
const {getCoursesBySearch} = require("../controllers/courseController")

router.get("/getCoursesBySearch", getCoursesBySearch);

module.exports = router;