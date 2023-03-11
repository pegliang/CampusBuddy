const express = require('express');
const router = express.Router();
const controller = require("../controllers/deleteController");

router.delete("/deleteClubById", controller.deleteClubByIdController);
router.delete("/deleteClubByName", controller.deleteClubByNameController);

module.exports = router;