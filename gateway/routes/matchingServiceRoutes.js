const express = require('express');
const router = express.Router();
const routes = require("../controllers/matching_service/MatchGenerationRoutes")

router.get("/getSuggestedMatches", routes.getSuggestedMatches)

module.exports = router