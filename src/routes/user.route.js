import express, { Router } from "express";
import UserControllers from "../controllers/user.controller.js";

const router = Router();
const userControllers = new UserControllers();
router.get("", userControllers.getAllUsers);
router.get("/:id", userControllers.getUserById);
router.delete("/:id", userControllers.deleteUserById);
router.put("/:id", userControllers.editUserById);

export default router;
