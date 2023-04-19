const express = require('express');
const router = express.Router();
const controller = require("../controllers/fetchController");

router.get("/getClubById", controller.getClubByIdController);
router.get("/getClubByName", controller.getClubByNameController);
router.get("/getAllClub", controller.fetchAllClubsController);
router.post("/checkUserOfMember", controller.checkIfUserIsMemberOfClubController);

module.exports = router;