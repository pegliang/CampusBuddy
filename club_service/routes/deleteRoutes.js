const express = require('express');
const router = express.Router();
const controller = require("../controllers/deleteController");

router.delete("/deleteClubById", controller.deleteClubByIdController);
router.delete("/deleteClubByName", controller.deleteClubByNameController);
router.delete("/leaveClub", controller.leaveClubController);

module.exports = router;