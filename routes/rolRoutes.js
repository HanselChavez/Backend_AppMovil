import express from "express";
import { crearRol, obtenerRoles } from "../controllers/rolController.js";
const router = express.Router();

router.get("/", obtenerRoles);
router.post("/", crearRol);
/*
router.get('/:id', obtenerUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);*/

export default router;
