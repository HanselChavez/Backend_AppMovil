import express from "express";
const router = express.Router();
import {
    addCita,
    getCitas,
    getCitasPorDoctor,
    getCitasPorPaciente
} from "../controllers/citaController.js";
router.get("/", getCitas);
router.post("/",addCita);
router.get("/doctor/:id", getCitasPorDoctor);
router.get("/paciente/:id", getCitasPorPaciente);

export default router;
