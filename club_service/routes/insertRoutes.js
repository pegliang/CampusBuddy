const express = require('express');
const router = express.Router();
const controller = require("../controllers/insertController");

router.post("/register", controller.registerController);
router.post("/joinClub", controller.joinClubController);
router.post("/createEvent", controller.createEventController);

module.exports = router;