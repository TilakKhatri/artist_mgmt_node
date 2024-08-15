import express from "express";
import { validateData } from "../validators/baseValidator.js";
import { userLoginSchema, userRegisterSchema } from "../schemas/user.schema.js";
import AuthControllers from "../controllers/auth.controller.js";
import { checkAuth } from "../middlewares/authHandler.js";

const authControllers = new AuthControllers();

const router = express.Router();

router.post(
  "/register",
  validateData(userRegisterSchema),
  authControllers.register
);
router.post("/login", validateData(userLoginSchema), authControllers.login);
router.post("/logout", checkAuth, authControllers.logout);

export default router;
