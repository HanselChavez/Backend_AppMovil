import express from "express";
import {
    crear,
    getByDoctor,
    getAll,
    getByPaciente,
} from "../controllers/historialController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/paciente/:id", getByPaciente);
router.get("/doctor/:id", getByDoctor);
router.post("/", crear);

export default router;
