const express = require('express');
const router = express.Router();
const controller = require("../controllers/insertController");

router.post("/register", controller.registerController);

module.exports = router;