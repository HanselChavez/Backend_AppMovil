import express from "express";
const router = express.Router();
import {
    obtenerDoctores,
    crearDoctor,
    obtenerDoctoresPorEspecialidad,
} from "../controllers/doctorController.js";

router.get("/", obtenerDoctores);
router.get("/especialidad/:id", obtenerDoctoresPorEspecialidad);
router.post("/", crearDoctor);

export default router;
