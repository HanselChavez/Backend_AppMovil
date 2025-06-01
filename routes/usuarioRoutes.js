import express from "express";
const router = express.Router();
import {
    obtenerUsuarios,
    crearUsuario,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario,
} from "../controllers/usuarioController.js";
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   dni:
 *                     type: string
 *                     example: "12345678"
 *                   nombres:
 *                     type: string
 *                     example: "Juan"
 *                   apellidos:
 *                     type: string
 *                     example: "Pérez"
 *                   correo:
 *                     type: string
 *                     example: "juan.perez@example.com"
 *                   telefono:
 *                     type: string
 *                     example: "987654321"
 *                   direccion:
 *                     type: string
 *                     example: "Av. Los Álamos 123"
 *                   fechaNacimiento:
 *                     type: string
 *                     format: date
 *                     example: "1998-05-31"
 *                   sexo:
 *                     type: string
 *                     example: "M"
 *                   foto_perfil:
 *                     type: string
 *                     format: uri
 *                     example: "https://tuservidor.com/avatars/juan12345678.jpg"
 *                   rol_id:
 *                     type: integer
 *                     example: 3
 *       500:
 *         description: Error al obtener usuarios
 */
router.get("/", obtenerUsuarios);
router.post("/", crearUsuario);
router.get("/:id", obtenerUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;
