const express = require('express');
const router = express.Router();
const controller = require("../controllers/fetchController");

router.get("/getClubByName", controller.getClubByNameController);

module.exports = router;