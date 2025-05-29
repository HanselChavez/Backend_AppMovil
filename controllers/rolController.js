import Rol from "../models/rolModel.js";

export const obtenerRoles = async (req, res) => {
    try {
        const roles = await Rol.getAllRoles();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener roles" });
    }
};

export const crearRol = async (req, res) => {
    try {
        const rol = await Rol.createRol(req.body);
        res.status(201).json(rol);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al crear rol" });
    }
};
