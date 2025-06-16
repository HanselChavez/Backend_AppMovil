import express from "express";
const router = express.Router();
import {
    getCitasPorDoctor,
    getCitasPorPaciente
} from "../controllers/citaController.js";

router.get("/doctor/:id", getCitasPorDoctor);
router.get("/paciente/:id", getCitasPorPaciente);

export default router;
