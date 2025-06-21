import Resena from "../models/resenaModel.js";

export const getAll = async (req, res) => {
    const data = await Resena.getAll();
    res.json(data);
};
export const getResenasPorDoctor = async (req, res) => {
    const { id } = req.params;
    const data = await Resena.getByDoctorId(id);
    res.json(data);
};

export const getResenasPorPaciente = async (req, res) => {
    const { id } = req.params;
    const data = await Resena.getByPacienteId(id);
    res.json(data);
};

export const crearResena = async (req, res) => {
    const { cita_id, calificacion, comentario } = req.body;
    const result = await Resena.crear({ cita_id, calificacion, comentario });
    res.status(201).json(result);
};
