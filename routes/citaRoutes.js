import express from "express";
const router = express.Router();
import {
    addCita,
    updateCita,
    getCitas,
    getCitasPorDoctor,
    getCitasPorPaciente
} from "../controllers/citaController.js";
router.get("/", getCitas);
router.post("/",addCita);
router.put("/:id",updateCita);
router.get("/doctor/:id", getCitasPorDoctor);
router.get("/paciente/:id", getCitasPorPaciente);

export default router;
