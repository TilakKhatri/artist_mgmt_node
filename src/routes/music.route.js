import express, { Router } from "express";
import MusicControllers from "../controllers/music.controller.js";
import { validateData } from "../validators/baseValidator.js";
import { musicSchema } from "../schemas/music.schema.js";

const router = Router();
const musicControllers = new MusicControllers();

router.post("", validateData(musicSchema), musicControllers.create);
router.get("", musicControllers.getAllMusic);
router.get("/:id", musicControllers.getMusicById);
router.delete("/:id", musicControllers.deleteMusicById);
router.put("/:id", validateData(musicSchema), musicControllers.editMusicById);

export default router;
