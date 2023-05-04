const express = require('express');
const router = express.Router();
const controller = require("../controllers/insertController");

router.post("/register", controller.registerController);
router.post("/updateUser", controller.updateController);

module.exports = router;