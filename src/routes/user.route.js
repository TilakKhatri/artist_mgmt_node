import express, { Router } from "express";
import UserControllers from "../controllers/user.controller.js";
import { createUserSchema } from "../schemas/user.schema.js";
import { validateData } from "../validators/baseValidator.js";

const router = Router();
const userControllers = new UserControllers();

router.post("", validateData(createUserSchema), userControllers.create);
router.get("", userControllers.getAllUsers);
router.get("/:id", userControllers.getUserById);
router.delete("/:id", userControllers.deleteUserById);
router.put(
  "/:id",
  validateData(createUserSchema),
  userControllers.editUserById
);

export default router;
