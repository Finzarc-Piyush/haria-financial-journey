const { Router } = require("express");
const errorHandler = require("../middlewares/errorHandler");
const contactRouter = require("./contactRoutes");
const authRouter = require("./authRoutes");
const analyticsRouter = require("./analyticsRoutes");
const financialHealthRouter = require("./financialHealthRoutes");
const { weeklyReport } = require("../controllers/weeklyReportController");

const router = Router();

router.use("/auth", authRouter);
router.use("/contact", contactRouter);
router.use("/analytics", analyticsRouter);
router.use("/financial-health", financialHealthRouter);
router.get("/reports/weekly", weeklyReport);   // Vercel Cron, Mondays 09:00 IST

router.use(errorHandler);

module.exports = router; 