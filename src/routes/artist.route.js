import express, { Router } from "express";
import ArtistControllers from "../controllers/artist.controller.js";

const router = Router();
const artistControllers = new ArtistControllers();
router.get("", artistControllers.getAllArtists);
router.get("/:id", artistControllers.getArtistById);
router.delete("/:id", artistControllers.deleteArtistById);
router.put("/:id", artistControllers.editArtistById);

export default router;
