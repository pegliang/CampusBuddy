const express = require('express');
const router = express.Router();
const controller = require("../controllers/fetchController");

router.get("/getUserAccountInfoByEmail", controller.fetchUserByEmailController);
router.get("/getUserAccountInfoById", controller.fetchUserByIdController);

module.exports = router;