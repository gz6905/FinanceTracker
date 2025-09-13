const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", protect, dashboardController.getDashboardData);
router.get("/savings-goal", protect, dashboardController.getSavingsGoal);
router.post("/savings-goal", protect, dashboardController.setSavingsGoal);

module.exports = router;
