import Sede from "../models/sedeModel.js";

export const addSede = async (req, res) => {
    const { nombre, direccion } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: "El nombre es obligatorio" });
    }
    try {
        const nuevaSede = await Sede.create({ nombre, direccion });
        res.status(201).json(nuevaSede);
    } catch (error) {
        console.error("Error al crear sede:", error);
        res.status(500).json({ error: "Error al crear sede" });
    }
};

export const getSedes = async (req, res) => {
    try {
        const sedes = await Sede.getAll();
        res.json(sedes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener todas las sedes" });
    }
};
