const express = require('express');
const router = express.Router();
const controller = require("./controller");

router.post("/auth", controller.authController);
router.put("/addRefreshToken", controller.addRefreshTokenController);
router.post("/removeRefreshToken", controller.removeRefreshTokenController);

module.exports = router;