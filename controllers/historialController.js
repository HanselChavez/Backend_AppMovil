import Historial from "../models/historialModel.js";

export const getAll = async (req, res) => {
    const result = await Historial.getAll();
    res.json(result);
};

export const getByPaciente = async (req, res) => {
    const { id } = req.params;
    const result = await Historial.getByPaciente(id);
    res.json(result);
};

export const getByDoctor = async (req, res) => {
    const { id } = req.params;
    const result = await Historial.getByDoctor(id);
    res.json(result);
};

export const crear = async (req, res) => {
    const {
        paciente_id,
        doctor_id,
        cita_id,
        diagnostico,
        tratamiento,
        recomendaciones,
    } = req.body;
    const result = await Historial.crear({
        paciente_id,
        doctor_id,
        cita_id,
        diagnostico,
        tratamiento,
        recomendaciones,
    });
    res.status(201).json(result);
};
