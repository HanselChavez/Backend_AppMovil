import express from "express";
import {
    getAll,
    getResenasPorDoctor,
    getResenasPorPaciente,
    crearResena,
} from "../controllers/resenaController.js";

const router = express.Router();

router.get("/doctor/:id", getResenasPorDoctor);
router.get("/paciente/:id", getResenasPorPaciente);
router.get("/", getAll);
router.post("/", crearResena);

export default router;

