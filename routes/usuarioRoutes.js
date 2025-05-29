import express from "express";
const router = express.Router();
import {
    obtenerUsuarios,
    crearUsuario,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario,
} from "../controllers/usuarioController.js";

router.get("/", obtenerUsuarios);
router.post("/", crearUsuario);
router.get("/:id", obtenerUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;
