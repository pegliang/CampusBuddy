const express = require('express');
const router = express.Router();
const controller = require("../controllers/fetchController");

router.get("/fetch-user", controller.fetchUserController);

module.exports = router;