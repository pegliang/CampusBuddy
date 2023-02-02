const express = require('express');
const router = express.Router();
const controller = require("../controllers/user_service/loginController");

// router.post("/register", controller.loginController);
router.post("/login", controller.loginController);

module.exports = router;