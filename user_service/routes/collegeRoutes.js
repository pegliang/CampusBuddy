const express = require('express');
const router = express.Router();
const {getCollegeByID, getCollegeBySearch} = require("../controllers/collegeController")

router.get("/getCollegeByID", getCollegeByID);
router.get("/getCollegeBySearch", getCollegeBySearch)

module.exports = router;