const express = require('express');
const router = express.Router();
const matchGenerationRoutes = require("../controllers/matching_service/MatchGenerationRoutes")
const swipeRoutes = require("../controllers/matching_service/SwipeRoutes")

router.get("/getSuggestedMatches", matchGenerationRoutes.getSuggestedMatches)
router.post("/swipe", swipeRoutes.swipe)

module.exports = router