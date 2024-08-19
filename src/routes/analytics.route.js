import { Router } from "express";
import AnalyticsControllers from "../controllers/analytics.controller.js";

const analyticsControllers = new AnalyticsControllers();

const router = Router();

router.get("/all", analyticsControllers.getCounts);

export default router;
