import express, { Router } from "express";
import ArtistControllers from "../controllers/artist.controller.js";
import { validateData } from "../validators/baseValidator.js";
import { artistSchema } from "../schemas/artist.schema.js";
import { exportCSV, importCsv } from "../controllers/csv.controller.js";
import multer from "multer";

const router = Router();
const artistControllers = new ArtistControllers();

const upload = multer({ dest: "uploads/" });

router.get("/export", exportCSV);
router.post("/import", upload.single("file"), importCsv);

router.post("", validateData(artistSchema), artistControllers.create);
router.get("", artistControllers.getAllArtists);
router.get("/:id", artistControllers.getArtistById);
router.get("/:id/music", artistControllers.getArtistCreation);
router.delete("/:id", artistControllers.deleteArtistById);
router.put(
  "/:id",
  validateData(artistSchema),
  artistControllers.editArtistById
);

export default router;
