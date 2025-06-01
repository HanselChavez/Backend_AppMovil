import express from "express";
const router = express.Router();
import { login, register } from "../controllers/authController.js";
import { upload } from "../config/multerConfig.js";

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario con imagen
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - dni
 *               - nombres
 *               - apellidos
 *               - correo
 *               - clave
 *               - telefono
 *               - direccion
 *               - fechaNacimiento
 *               - sexo
 *             properties:
 *               dni:
 *                 type: string
 *                 example: "12345678"
 *               nombres:
 *                 type: string
 *                 example: "Juan"
 *               apellidos:
 *                 type: string
 *                 example: "Pérez"
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: "juan.perez@example.com"
 *               clave:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *               telefono:
 *                 type: string
 *                 example: "987654321"
 *               direccion:
 *                 type: string
 *                 example: "Av. Los Álamos 123"
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 example: "31/05/1998"
 *               sexo:
 *                 type: string
 *                 enum: [M, F]
 *                 example: "M"
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Usuario registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 correo:
 *                   type: string
 *                 nombres:
 *                   type: string
 *       400:
 *         description: Correo y contraseña son requeridos
 *       401:
 *         description: Este correo ya está en uso
 *       500:
 *         description: Error interno del servidor
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - clave
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: "juan.perez@example.com"
 *               clave:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT generado
 *                 rol:
 *                   type: string
 *                   description: Rol del usuario (por ejemplo, "admin", "usuario")
 *       400:
 *         description: Correo y contraseña son requeridos
 *       401:
 *         description: Correo o contraseña incorrectos
 *       500:
 *         description: Error interno del servidor
 */

router.post("/login", login);
router.post("/register", upload.single("imagen"), register);

export default router;
