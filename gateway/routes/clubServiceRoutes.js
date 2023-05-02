const express = require('express');
const router = express.Router();
const middlewares = require("../middlewares/verifyTokens");

const insertController = require("../controllers/club_service/insertController");
const fetchController = require("../controllers/club_service/fetchController");
const deleteController = require("../controllers/club_service/deleteController");

router.post("/register", middlewares.verifyTokens, insertController.registerController);
router.post("/joinClub", middlewares.verifyTokens, insertController.joinClubController);
router.post("/createEvent", middlewares.verifyTokens, insertController.createEventController);
router.post("/rsvpEvent", middlewares.verifyTokens, insertController.rsvpEventController);

router.get("/getClubById", fetchController.getClubByIdController);
router.get("/getClubByName", fetchController.getClubByNameController);
router.get("/getAllClub", fetchController.fetchAllClubsController);
router.get("/getEventByName", fetchController.getEventByNameController);
router.post("/checkUserOfMember", fetchController.checkIfUserIsMemberOfClubController);

router.post("/deleteClubById", middlewares.verifyTokens, deleteController.deleteClubByIdController);
router.delete("/leaveClub", middlewares.verifyTokens, deleteController.leaveClubController);

module.exports = router;