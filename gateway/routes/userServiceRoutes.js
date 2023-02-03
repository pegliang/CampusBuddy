const express = require('express');
const router = express.Router();
const middlewares = require("../middlewares/verifyTokens");

const loginController = require("../controllers/user_service/loginController");
const insertController = require("../controllers/user_service/insertController");

router.post("/register", insertController.registerController);
router.post("/login", loginController.loginController);

module.exports = router;