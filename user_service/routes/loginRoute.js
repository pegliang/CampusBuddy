const express = require('express');
const router = express.Router();
const controller = require("../controllers/loginController");

router.post("/login", controller.loginController);

module.exports = router;