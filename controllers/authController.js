import jwt from "jsonwebtoken";
import Usuario from "../models/usuarioModel.js";
import Rol from "../models/rolModel.js";
export const login = async (req, res) => {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
        return res
            .status(400)
            .json({ error: "Correo y contraseña son requeridos" });
    }

    try {
        const user = await Usuario.findUserByEmail(correo);
        if (!user) {
            return res
                .status(401)
                .json({ error: "Correo o contraseña incorrectos" });
        }

        const isMatch = await Usuario.comparePassword(
            contrasena,
            user.contraseña
        );
        if (!isMatch) {
            return res
                .status(401)
                .json({ error: "Correo o contraseña incorrectos" });
        }

        const rolNombre = await Rol.findRoleById(user.rol_id);

        const token = jwt.sign(
            { userId: user.id, rol: rolNombre },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token, rol: rolNombre });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const register = async (req, res) => {
    const { nombre, apellido, correo, contrasena } = req.body;
    console.log(req.body);
    if (!correo || !contrasena) {
        return res
            .status(400)
            .json({ error: "Correo y contraseña son requeridos" });
    }

    try {
        const user = await Usuario.findUserByEmail(correo);
        if (user) {
            return res
                .status(401)
                .json({ error: "Este correo ya esta en uso." });
        }
        const userNuevo = await Usuario.createUsuario({
            nombre,
            apellido,
            correo,
            contrasena,
            telefono: null,
            foto_perfil: null,
            rol_id: 3,
        });
        res.json(userNuevo);
    } catch (error) {
        console.error("Error en register:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
