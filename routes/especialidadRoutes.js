import express from "express";
const router = express.Router();
import {
    obtenerEspecialidades,
    crearEspecialidad,
} from "../controllers/especialidadController.js";
import { eliminarEspecialidad } from "../controllers/especialidadController.js";

router.get("/", obtenerEspecialidades);
router.post("/", crearEspecialidad);



export default router;