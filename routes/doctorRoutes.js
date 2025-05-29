import express from "express";
const router = express.Router();
import {
    obtenerDoctores,
    crearDoctor,
} from "../controllers/doctorController.js";

router.get("/", obtenerDoctores);
router.post("/", crearDoctor);

export default router;
