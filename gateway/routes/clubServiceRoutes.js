const express = require('express');
const router = express.Router();
const middlewares = require("../middlewares/verifyTokens");

const insertController = require("../controllers/club_service/insertController");
const fetchController = require("../controllers/club_service/fetchController");
const deleteController = require("../controllers/club_service/deleteController");

router.post("/register", middlewares.verifyTokens, insertController.registerController);
router.post("/joinClub", insertController.joinClubController);
router.post("/createEvent", insertController.createEventController);

router.get("/getClubById", fetchController.getClubByIdController);
router.get("/getClubByName", fetchController.getClubByNameController);
router.get("/getAllClub", fetchController.fetchAllClubsController);
router.post("/checkUserOfMember", fetchController.checkIfUserIsMemberOfClubController);

router.post("/deleteClubById", middlewares.verifyTokens, deleteController.deleteClubByIdController);
router.delete("/leaveClub", deleteController.leaveClubController);

module.exports = router;