const express = require('express');
const router = express.Router();
const controller = require("../controllers/verifyController");

router.get("/verifyEmail", controller.verifyEmailController);

module.exports = router;