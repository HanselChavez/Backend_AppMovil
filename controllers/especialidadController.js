import Especialidad from "../models/especialidadModel.js";

export const obtenerEspecialidades = async (req, res) => {
    try {
        const especialidades = await Especialidad.getAllEspecialidades();
        res.json(especialidades);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener especialidades" });
    }
}
export const crearEspecialidad = async (req, res) => {
    try {
        const especialidad = await Especialidad.createEspecialidad(req.body);
        res.status(201).json(especialidad);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al crear especialidad" });
    }
};

export const obtenerEspecialidad = async (req, res) => {
    try {
        const especialidad = await Especialidad.getEspecialidadById(req.params.id);
        if (!especialidad)
            return res.status(404).json({ mensaje: "Especialidad no encontrada" });
        res.json(especialidad);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener especialidad" });
    }
}

export const actualizarEspecialidad = async (req, res) => {
    try {
        const especialidad = await Especialidad.updateEspecialidad(req.params.id, req.body);
        res.json(especialidad);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al actualizar especialidad" });
    }
};

export const eliminarEspecialidad = async (req, res) => {
    try {
        await Especialidad.deleteEspecialidad(req.params.id);
        res.json({ mensaje: "Especialidad eliminada" });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al eliminar especialidad" });
    }
};