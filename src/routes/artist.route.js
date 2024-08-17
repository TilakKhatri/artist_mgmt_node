import express, { Router } from "express";
import ArtistController from "../controllers/artist.controller.js";

const router = Router();
const artistControllers = new ArtistController();
router.get("", artistControllers.getAllUsers);
router.get("/:id", artistControllers.getUserById);
router.delete("/:id", artistControllers.deleteUserById);
router.put("/:id", artistControllers.editUserById);

export default router;
