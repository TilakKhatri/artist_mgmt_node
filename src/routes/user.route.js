import express, { Router } from "express";
import UserControllers from "../controllers/user.controller.js";

const router = Router();
const userControllers = new UserControllers();
router.get("", userControllers.getAllUsers);

export default router;
