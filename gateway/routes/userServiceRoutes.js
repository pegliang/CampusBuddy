const express = require('express');
const router = express.Router();
const middlewares = require("../middlewares/verifyTokens");

const loginController = require("../controllers/user_service/loginController");
const logoutController = require("../controllers/user_service/logoutController");
const insertController = require("../controllers/user_service/insertController");
const fetchController = require("../controllers/user_service/fetchController");
const deleteController = require("../controllers/user_service/deleteController");

router.post("/register", insertController.registerController);
router.post("/login", loginController.loginController);

router.get("/getUserAccountInfoByEmail", fetchController.fetchUserByEmailController);
router.get("/getUserAccountInfoById", fetchController.fetchUserByIdController);

router.delete("/deleteUserByEmail", middlewares.verifyTokens, deleteController.deleteUserByEmailController);

router.post("/logout", logoutController.logoutController);

// for testing purposes only
router.post("/test_auth", middlewares.verifyTokens);

module.exports = router;