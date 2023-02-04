const express = require('express');
const router = express.Router();
const controller = require("./controller");

router.post("/auth", controller.auth);

module.exports = router;