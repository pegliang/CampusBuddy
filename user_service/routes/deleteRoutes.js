const express = require('express');
const router = express.Router();
const controller = require("../controllers/deleteController");

router.delete("/deleteUserByEmail", controller.deleteUserByEmailController);

module.exports = router;